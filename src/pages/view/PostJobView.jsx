import React from 'react';

// Helper components (presentational only)
export const GenderToggle = ({ name, label, value, onChange, options }) => (
  <div>
    <label className="block text-xs font-medium text-gray-600 mb-1.5">{label}</label>
    <div className="flex items-center gap-0 rounded-md border border-gray-300 overflow-hidden text-xs sm:text-sm">
      {options.map((option) => (
        <button
          key={`${name}-${option}`}
          type="button"
          onClick={() => onChange(option)}
          className={`flex-1 py-1.5 sm:py-2 px-2 text-center transition-colors duration-200 focus:outline-none border-r border-gray-300 last:border-r-0 ${
            value === option ? 'bg-[#6344cc] text-white z-10' : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export const SelectInput = ({ name, label, value, onChange, options, required = false }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6344cc] focus:border-[#6344cc] text-sm"
    >
      {options.map((option) => (
        <option key={`${name}-${option}`} value={option}>
          {option || `-- Select ${label} --`}
        </option>
      ))}
    </select>
  </div>
);

export const TextInput = ({ name, label, value, onChange, placeholder = '', type = 'text', required = false, maxLength }) => (
  <div>
    <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">{label}</label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      maxLength={maxLength}
      className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6344cc] focus:border-[#6344cc] text-sm"
    />
  </div>
);

const PostJobView = ({
  formData,
  availableLocations,
  message,
  isLoading,
  subjectToAdd,
  subjectError,
  handlers,
  dataSources,
}) => {
  const {
    handleCancel,
    handleSubmit,
    handleInputChange,
    handleTutorGenderChange,
    handleStudentGenderChange,
    addSubject,
    removeSubject,
    setSubjectToAdd,
  } = handlers;

  const { studentCountOptions, cityOptions, paymentOptions, mediumOptions, classOptions, tuitionTypeOptions, daysOptions, subjectOptions } = dataSources;

  return (
    <div className="min-h-screen w-full bg-slate-800 flex flex-col items-center p-4 sm:p-6 font-roboto">
      <header className="w-full max-w-4xl mb-6 flex justify-center items-center relative">
        <div className="shadow-[0px_4px_20px_rgba(0,0,0,0.15)] rounded-3xl bg-white/80 backdrop-blur-sm py-4 px-16">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 text-center">Hire Tutor</h1>
        </div>
        <button onClick={handleCancel} className="absolute top-1/2 right-0 transform -translate-y-1/2 text-gray-100 hover:text-red-500 text-2xl p-2">
          ×
        </button>
      </header>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl bg-white p-6 sm:p-8 rounded-xl shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
          <SelectInput name="noOfStudents" label="No of Students" value={formData.noOfStudents} onChange={handleInputChange} options={studentCountOptions} required />
          <SelectInput name="city" label="Select City" value={formData.city} onChange={handleInputChange} options={cityOptions} required />
          <TextInput name="address" label="Full Street Address (House, Road, etc.)" value={formData.address} onChange={handleInputChange} placeholder="E.g: Flat:3E, House:16, Road:5" required maxLength={150} />
          <SelectInput name="location" label="Select Location (Thana/Area)" value={formData.location} onChange={handleInputChange} options={availableLocations} required />

          <GenderToggle name="tutorGenderPref" label="Tutor Gender Preference" value={formData.tutorGenderPref} onChange={handleTutorGenderChange} options={["Male", "Female", "Any"]} />
          <GenderToggle name="studentGender" label="Student Gender" value={formData.studentGender} onChange={handleStudentGenderChange} options={["Male", "Female"]} />

          <div>
            <TextInput name="salary" label="Salary (BDT)" value={formData.salary} onChange={handleInputChange} placeholder="Enter Job salary" type="number" required maxLength={6} />
            <p className="text-xs text-right text-gray-500 mt-1">{formData.salary.length} / 6</p>
          </div>
          <SelectInput name="paymentType" label="Payment Basis" value={formData.paymentType} onChange={handleInputChange} options={paymentOptions} required />

          <SelectInput name="category" label="Category (Medium)" value={formData.category} onChange={handleInputChange} options={mediumOptions} required />
          <SelectInput name="classCourse" label="Class/Course" value={formData.classCourse} onChange={handleInputChange} options={classOptions} required />

          <SelectInput name="tuitionType" label="Tuition Type" value={formData.tuitionType} onChange={handleInputChange} options={tuitionTypeOptions} required />
          <SelectInput name="daysPerWeek" label="Days/Week" value={formData.daysPerWeek} onChange={handleInputChange} options={daysOptions} required />

          <div>
            <TextInput name="tutoringTime" label="Tutoring Time (e.g. 5 PM - 7 PM)" value={formData.tutoringTime} onChange={handleInputChange} placeholder="Specify preferred time slot" required maxLength={20} />
            <p className="text-xs text-right text-gray-500 mt-1">{formData.tutoringTime.length} / 20</p>
          </div>
          <TextInput name="startingDate" label="Preferred Starting Date" value={formData.startingDate} onChange={handleInputChange} type="date" required />

          <div className="md:col-span-2">
            <label htmlFor="subjectToAdd" className="block text-xs font-medium text-gray-600 mb-1">Add Subjects (Max 5)</label>

            {formData.subjects.length > 0 && (
              <div className="mt-2 mb-3 flex flex-wrap gap-1.5 border p-2 rounded-md min-h-[40px]">
                {formData.subjects.map((subject, index) => (
                  <span key={`selected-subject-${subject}-${index}`} className="flex items-center bg-purple-100 text-purple-800 text-xs font-medium pl-2 pr-1 py-0.5 rounded-full h-fit">
                    {subject}
                    <button type="button" onClick={() => removeSubject(subject)} className="ml-1.5 text-purple-500 hover:text-purple-700 focus:outline-none" aria-label={`Remove ${subject}`}>
                      ✕
                    </button>
                  </span>
                ))}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-2">
              <select
                id="subjectToAdd"
                value={subjectToAdd}
                onChange={(e) => {
                  setSubjectToAdd(e.target.value);
                }}
                className="flex-grow p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6344cc] focus:border-[#6344cc] text-sm"
              >
                {subjectOptions
                  .filter((option) => !formData.subjects.includes(option))
                  .map((option) => (
                    <option key={`subject-option-${option}`} value={option}>
                      {option || '-- Select Subject --'}
                    </option>
                  ))}
              </select>
              <button type="button" onClick={addSubject} disabled={!subjectToAdd || formData.subjects.length >= 5} className="flex-shrink-0 px-4 py-2 bg-[#6344cc] text-white text-sm font-medium rounded-md hover:bg-[#5238a8] disabled:bg-gray-300 disabled:cursor-not-allowed">
                Add
              </button>
            </div>
            {subjectError && <p className="text-red-500 text-xs mt-1">{subjectError}</p>}
          </div>

          <div className="md:col-span-2">
            <label htmlFor="details" className="block text-xs font-medium text-gray-600 mb-1">Detailed Requirements (Optional) </label>
            <textarea id="details" name="details" rows="3" value={formData.details || ''} onChange={handleInputChange} className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-[#6344cc] focus:border-[#6344cc] text-sm" placeholder="State specific needs." maxLength={500}></textarea>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col items-center">
          {message.text && (
            <p className={`mb-4 text-sm text-center ${message.type === 'error' ? 'text-red-600' : 'text-green-600'}`}>{message.text}</p>
          )}
          <button type="submit" disabled={isLoading} className={`w-full sm:w-auto ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#6344cc] hover:bg-[#5238a8]'} text-white px-10 py-3 rounded-lg font-semibold text-base transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-[#6344cc] focus:ring-offset-2`}>
            {isLoading ? 'Posting...' : 'Post Job'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostJobView;
