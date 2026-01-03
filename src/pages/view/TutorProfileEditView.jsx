// TutorProfileEditView.jsx - Pure Presentation Component
import React from 'react';
import {
    FaSave,
    FaUpload,
    FaSpinner,
    FaInfoCircle,
    FaBookOpen,
    FaGraduationCap
} from 'react-icons/fa';

// ============================================================================
// REUSABLE FORM FIELD COMPONENTS
// ============================================================================

const InputField = ({ 
    label, 
    name, 
    value, 
    onChange, 
    type = "text", 
    required = false, 
    placeholder = "", 
    readOnly = false, 
    focusRingColor = "focus:ring-[#6344cc]", 
    ...props 
}) => (
    <div>
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <input 
            type={type} 
            id={name} 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            required={required} 
            placeholder={placeholder} 
            readOnly={readOnly} 
            {...props}
            className={`w-full p-2 border rounded-md focus:outline-none focus:ring-1 ${focusRingColor} text-sm ${
                readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed border-gray-200' : 'border-gray-300'
            }`} 
        />
    </div>
);

const SelectField = ({ 
    label, 
    name, 
    value, 
    onChange, 
    options, 
    required = false, 
    focusRingColor = "focus:ring-[#6344cc]", 
    ...props 
}) => (
    <div>
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">
            {label}
            {required && <span className="text-red-500">*</span>}
        </label>
        <select 
            id={name} 
            name={name} 
            value={value} 
            onChange={onChange} 
            required={required} 
            {...props}
            className={`w-full p-2 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-1 ${focusRingColor} focus:border-[#6344cc] text-sm`}
        >
            {options.map(optionObj => (
                <option key={optionObj.value} value={optionObj.value}>
                    {optionObj.label}
                </option>
            ))}
        </select>
    </div>
);

const TextAreaField = ({ 
    label, 
    name, 
    value, 
    onChange, 
    rows = 3, 
    placeholder = "", 
    focusRingColor = "focus:ring-[#6344cc]", 
    ...props 
}) => (
    <div>
        <label htmlFor={name} className="block text-xs font-medium text-gray-600 mb-1">
            {label}
        </label>
        <textarea 
            id={name} 
            name={name} 
            value={value || ''} 
            onChange={onChange} 
            rows={rows} 
            placeholder={placeholder} 
            {...props}
            className={`w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 ${focusRingColor} focus:border-[#6344cc] text-sm`}
        />
    </div>
);

const CheckboxField = ({ 
    id, 
    name, 
    checked, 
    onChange, 
    label, 
    focusRingColor = "focus:ring-[#6344cc]" 
}) => (
    <div className="flex items-center mt-2">
        <input 
            type="checkbox" 
            id={id} 
            name={name} 
            checked={!!checked} 
            onChange={onChange} 
            className={`h-4 w-4 rounded text-[#6344cc] focus:ring-1 ${focusRingColor}`} 
        />
        <label htmlFor={id} className="ml-2 block text-xs font-medium text-gray-600">
            {label}
        </label>
    </div>
);

// ============================================================================
// SECTION HEADER COMPONENT
// ============================================================================

const SectionHeader = ({ icon, title, colorClass }) => (
    <div className={`${colorClass} text-white px-4 py-2 rounded-t-lg flex items-center gap-2`}>
        {icon}
        <h2 className="text-lg font-semibold">{title}</h2>
    </div>
);

// ============================================================================
// PROFILE IMAGE SECTION
// ============================================================================

const ProfileImageSection = ({ 
    profileImagePreview, 
    profileImageFallback, 
    tutorId, 
    handleFileChange 
}) => (
    <div className="w-full max-w-lg mb-8">
        <div className="bg-white p-6 rounded-xl shadow-lg flex flex-col items-center">
            <div className="flex flex-col items-center mb-5 w-full">
                <label htmlFor="profilePictureInput" className="cursor-pointer group relative">
                    <img 
                        src={profileImagePreview || profileImageFallback} 
                        alt="Profile Preview" 
                        onError={(e) => { 
                            e.target.onerror = null; 
                            e.target.src = profileImageFallback; 
                        }}
                        className="w-32 h-32 sm:w-36 sm:h-36 rounded-full border-4 border-gray-200 shadow-md object-cover mb-2 group-hover:opacity-70 transition-opacity" 
                    />
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                        <FaUpload className="text-white text-2xl" />
                    </div>
                </label>
                <input 
                    type="file" 
                    id="profilePictureInput" 
                    accept="image/png, image/jpeg, image/webp" 
                    onChange={handleFileChange} 
                    className="hidden" 
                />
                <p className="text-xs text-gray-500 mt-2">Click image to change (Max 512KB)</p>
                <p className="text-sm text-gray-600 mt-4">Tutor ID: {tutorId || 'N/A'}</p>
            </div>
        </div>
    </div>
);

// ============================================================================
// PERSONAL INFORMATION SECTION
// ============================================================================

const PersonalInfoSection = ({ 
    formData, 
    handleInputChange, 
    sectionHeaderColorClass, 
    focusRingColorClass,
    genderOptions 
}) => (
    <section>
        <SectionHeader 
            icon={<FaInfoCircle />}
            title="Personal Information"
            colorClass={sectionHeaderColorClass}
        />
        <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <InputField 
                label="Name" 
                name="name" 
                value={formData.name} 
                onChange={handleInputChange} 
                readOnly={true} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Email" 
                name="email_display" 
                value={formData.email} 
                readOnly={true} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Additional Number" 
                name="additionalNumber" 
                value={formData.additionalNumber} 
                onChange={handleInputChange} 
                type="tel" 
                focusRingColor={focusRingColorClass} 
            />
            <SelectField 
                label="Gender" 
                name="gender" 
                value={formData.gender} 
                onChange={handleInputChange} 
                options={genderOptions} 
                required={true} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Date of Birth" 
                name="dateOfBirth" 
                value={formData.dateOfBirth} 
                onChange={handleInputChange} 
                type="date" 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Religion" 
                name="religion" 
                value={formData.religion} 
                onChange={handleInputChange} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="National ID" 
                name="nationalId" 
                value={formData.nationalId} 
                onChange={handleInputChange} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Nationality" 
                name="nationality" 
                value={formData.nationality} 
                onChange={handleInputChange} 
                focusRingColor={focusRingColorClass} 
            />
            <div className="sm:col-span-2">
                <InputField 
                    label="Current Address" 
                    name="location" 
                    value={formData.location} 
                    onChange={handleInputChange} 
                    placeholder="Enter your full current address" 
                    focusRingColor={focusRingColorClass} 
                />
            </div>
            <div className="sm:col-span-1">
                <InputField 
                    label="Facebook Profile Link" 
                    name="facebookProfile" 
                    value={formData.facebookProfile} 
                    onChange={handleInputChange} 
                    type="url" 
                    placeholder="https://facebook.com/..." 
                    focusRingColor={focusRingColorClass} 
                />
                <p className="text-xs text-gray-500 mt-1">Optional. Helps with verification.</p>
            </div>
            <div className="sm:col-span-1">
                <InputField 
                    label="Google Drive Link (Documents)" 
                    name="driveLink" 
                    value={formData.driveLink} 
                    onChange={handleInputChange} 
                    type="url" 
                    placeholder="https://drive.google.com/..." 
                    focusRingColor={focusRingColorClass} 
                />
                <p className="text-xs text-gray-500 mt-1">
                    Upload verification documents and share the link here.
                </p>
            </div>
            <InputField 
                label="Father's Name" 
                name="fathersName" 
                value={formData.fathersName} 
                onChange={handleInputChange} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Father's Number" 
                name="fathersNumber" 
                value={formData.fathersNumber} 
                onChange={handleInputChange} 
                type="tel" 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Mother's Name" 
                name="mothersName" 
                value={formData.mothersName} 
                onChange={handleInputChange} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Mother's Number" 
                name="mothersNumber" 
                value={formData.mothersNumber} 
                onChange={handleInputChange} 
                type="tel" 
                focusRingColor={focusRingColorClass} 
            />
            <div className="sm:col-span-2">
                <InputField 
                    label="Emergency Contact" 
                    name="emergencyContact" 
                    value={formData.emergencyContact} 
                    onChange={handleInputChange} 
                    type="tel" 
                    focusRingColor={focusRingColorClass} 
                    required={true} 
                />
            </div>
        </div>
    </section>
);

// ============================================================================
// EDUCATION CARD COMPONENT
// ============================================================================

const EducationCard = ({ 
    edu, 
    index, 
    isSimplifiedView, 
    handleEducationChange,
    handleEducationFloatInputChange,
    focusRingColorClass,
    curriculumOptions 
}) => (
    <div className="p-4 border rounded-lg border-gray-300 shadow-sm bg-gray-50/50">
        <h4 className="font-semibold text-base text-gray-800 mb-3">{edu.level}</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3">
            <InputField 
                label="Institute" 
                name="institute" 
                value={edu.institute} 
                onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Result/Grade" 
                name="result" 
                value={edu.result} 
                onChange={(e) => handleEducationFloatInputChange(index, e.target.name, e.target.value)} 
                focusRingColor={focusRingColorClass} 
                placeholder="e.g., 4.75" 
            />
            
            {!isSimplifiedView && (
                <>
                    <SelectField 
                        label="Curriculum" 
                        name="curriculum" 
                        value={edu.curriculum} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        options={curriculumOptions} 
                        focusRingColor={focusRingColorClass} 
                    />
                    <InputField 
                        label="Exam/Degree" 
                        name="examDegree" 
                        value={edu.examDegree} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        focusRingColor={focusRingColorClass} 
                    />
                    <InputField 
                        label="From Date" 
                        name="fromDate" 
                        value={edu.fromDate} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        type="date" 
                        focusRingColor={focusRingColorClass} 
                    />
                    <InputField 
                        label="Major/Group" 
                        name="majorGroup" 
                        value={edu.majorGroup} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        focusRingColor={focusRingColorClass} 
                    />
                    <InputField 
                        label="To Date" 
                        name="toDate" 
                        value={edu.toDate} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        type="date" 
                        focusRingColor={focusRingColorClass} 
                    />
                    <InputField 
                        label="ID Card No" 
                        name="idCardNo" 
                        value={edu.idCardNo} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        focusRingColor={focusRingColorClass} 
                    />
                    <InputField 
                        label="Year of Passing" 
                        name="yearOfPassing" 
                        value={edu.yearOfPassing} 
                        onChange={(e) => handleEducationChange(index, e.target.name, e.target.value)} 
                        focusRingColor={focusRingColorClass} 
                    />
                    <div className="sm:col-span-2">
                        <CheckboxField
                            id={`edu_current_${index}`}
                            name="currentInstitute"
                            checked={edu.currentInstitute}
                            onChange={(e) => handleEducationChange(index, "currentInstitute", e.target.checked)}
                            label="Currently Studying Here"
                            focusRingColor={focusRingColorClass}
                        />
                    </div>
                </>
            )}
        </div>
    </div>
);

// ============================================================================
// EDUCATIONAL INFORMATION SECTION
// ============================================================================

const EducationalInfoSection = ({ 
    formData, 
    handleEducationChange, 
    handleEducationFloatInputChange,
    sectionHeaderColorClass, 
    focusRingColorClass,
    curriculumOptions 
}) => (
    <section>
        <SectionHeader 
            icon={<FaGraduationCap />}
            title="Educational Information"
            colorClass={sectionHeaderColorClass}
        />
        <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 space-y-6 text-sm">
            {formData.education?.map((edu, index) => {
                const isSimplifiedView = edu.level === "Secondary" || edu.level === "Higher Secondary";
                return (
                    <EducationCard
                        key={edu.id || `edu-${index}`}
                        edu={edu}
                        index={index}
                        isSimplifiedView={isSimplifiedView}
                        handleEducationChange={handleEducationChange}
                        handleEducationFloatInputChange={handleEducationFloatInputChange}
                        focusRingColorClass={focusRingColorClass}
                        curriculumOptions={curriculumOptions}
                    />
                );
            })}
        </div>
    </section>
);

// ============================================================================
// TUITION INFORMATION SECTION
// ============================================================================

const TuitionInfoSection = ({ 
    formData, 
    handleInputChange, 
    sectionHeaderColorClass, 
    focusRingColorClass,
    placeOfTutoringOptions 
}) => (
    <section>
        <SectionHeader 
            icon={<FaBookOpen />}
            title="Tuition Related Information"
            colorClass={sectionHeaderColorClass}
        />
        <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
            <div className="sm:col-span-2">
                <TextAreaField 
                    label="Tutoring Method / Approach" 
                    name="tutoringMethod" 
                    value={formData.tutoringMethod} 
                    onChange={handleInputChange} 
                    placeholder="Describe your teaching style..." 
                    focusRingColor={focusRingColorClass}
                />
            </div>
            <InputField 
                label="Available Days (comma-separated)" 
                name="availableDays" 
                value={formData.availableDays} 
                onChange={handleInputChange} 
                placeholder="e.g., Sat, Mon, Wed" 
                focusRingColor={focusRingColorClass}
            />
            <InputField 
                label="Available Time" 
                name="availableTime" 
                value={formData.availableTime} 
                onChange={handleInputChange} 
                placeholder="e.g., 4 PM - 7 PM" 
                focusRingColor={focusRingColorClass}
            />
            <div>
                <InputField 
                    label="Preferred Locations (comma-separated)" 
                    name="preferredLocations" 
                    value={formData.preferredLocations} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Banani, Gulshan" 
                    focusRingColor={focusRingColorClass} 
                    maxLength={60} 
                />
                <p className="text-xs text-right text-gray-500 mt-1">
                    {formData.preferredLocations.length} / 60
                </p>
            </div>
            <InputField 
                label="Expected Salary (BDT)" 
                name="expectedSalary" 
                value={formData.expectedSalary} 
                onChange={handleInputChange} 
                type="number" 
                placeholder="e.g., 10000" 
                min="0" 
                focusRingColor={focusRingColorClass}
            />
            <InputField 
                label="Preferred Classes (comma-separated)" 
                name="preferredClasses" 
                value={formData.preferredClasses} 
                onChange={handleInputChange} 
                placeholder="e.g., Class 8, O-Level" 
                focusRingColor={focusRingColorClass}
            />
            <div className="sm:col-span-2">
                <InputField 
                    label="Preferred Subjects (comma-separated)" 
                    name="preferredSubjects" 
                    value={formData.preferredSubjects} 
                    onChange={handleInputChange} 
                    placeholder="e.g., Physics, Math" 
                    focusRingColor={focusRingColorClass}
                />
            </div>
            <SelectField 
                label="Place of Tutoring" 
                name="placeOfTutoring" 
                value={formData.placeOfTutoring} 
                onChange={handleInputChange} 
                options={placeOfTutoringOptions} 
                focusRingColor={focusRingColorClass} 
            />
            <InputField 
                label="Tutoring Style (comma-separated)" 
                name="tutoringStyle" 
                value={formData.tutoringStyle} 
                onChange={handleInputChange} 
                placeholder="e.g., One to One, Group" 
                focusRingColor={focusRingColorClass}
            />
            <InputField 
                label="Total Experience" 
                name="totalExperience" 
                value={formData.totalExperience} 
                onChange={handleInputChange} 
                placeholder="e.g., 5 years" 
                focusRingColor={focusRingColorClass}
            />
        </div>
    </section>
);

// ============================================================================
// HOW DID YOU KNOW SECTION
// ============================================================================

const HowDidYouKnowSection = ({ 
    formData, 
    handleInputChange, 
    sectionHeaderColorClass, 
    focusRingColorClass,
    howDidYouKnowOptions 
}) => (
    <section>
        <SectionHeader 
            icon={<FaInfoCircle />}
            title="How did you know about us?"
            colorClass={sectionHeaderColorClass}
        />
        <div className="border border-t-0 border-gray-300 rounded-b-lg p-4 sm:p-6 text-sm">
            <SelectField 
                label="How did you find us?" 
                name="howDidYouKnow" 
                value={formData.howDidYouKnow} 
                onChange={handleInputChange} 
                options={howDidYouKnowOptions} 
                focusRingColor={focusRingColorClass} 
            />
        </div>
    </section>
);

// ============================================================================
// FORM ACTIONS (SAVE/CANCEL BUTTONS)
// ============================================================================

const FormActions = ({ 
    message, 
    saving, 
    handleCancel, 
    primaryColorClass, 
    hoverColorClass, 
    focusRingColorClass 
}) => (
    <div className="flex justify-end gap-4 mt-6 pt-6 border-t border-gray-200">
        {message.text && (
            <span className={`text-sm mr-auto ${
                message.type === 'error' ? 'text-red-600' : 'text-green-600'
            }`}>
                {message.text}
            </span>
        )}
        <button 
            type="button" 
            onClick={handleCancel} 
            disabled={saving} 
            className="px-5 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-1 disabled:opacity-50"
        >
            Cancel
        </button>
        <button 
            type="submit" 
            disabled={saving} 
            className={`flex items-center gap-2 px-5 py-2 text-sm font-medium text-white ${primaryColorClass} rounded-lg ${hoverColorClass} focus:outline-none focus:ring-2 ${focusRingColorClass} focus:ring-offset-1 disabled:opacity-50`}
        >
            {saving ? <FaSpinner className="animate-spin" /> : <FaSave />}
            {saving ? 'Saving...' : 'Save Changes'}
        </button>
    </div>
);

// ============================================================================
// MAIN VIEW COMPONENT
// ============================================================================

const TutorProfileEditView = ({
    formData,
    loading,
    saving,
    message,
    profileImagePreview,
    handleInputChange,
    handleFileChange,
    handleEducationChange,
    handleEducationFloatInputChange,
    handleSave,
    handleCancel,
    // Configuration props
    genderOptions,
    curriculumOptions,
    placeOfTutoringOptions,
    howDidYouKnowOptions,
}) => {
    // Theme colors
    const primaryColorClass = "bg-[#6344cc]";
    const hoverColorClass = "hover:bg-[#5238a8]";
    const focusRingColorClass = "focus:ring-[#6344cc]";
    const sectionHeaderColorClass = "bg-[#6344cc]";

    // Profile image fallback
    const profileImageFallback = "https://placehold.co/200x200/6344cc/FFF?text=" + 
        (formData.name ? formData.name.split(' ').map(n => n[0]).join('') : "T");

    // Loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-screen text-xl text-gray-100">
                Loading profile editor...
            </div>
        );
    }

    // Main render
    return (
        <div className="w-full min-h-screen bg-slate-800 p-4 sm:p-6 lg:p-8 font-roboto flex flex-col items-center">
            {/* Profile Image Section */}
            <ProfileImageSection
                profileImagePreview={profileImagePreview}
                profileImageFallback={profileImageFallback}
                tutorId={formData.tutorId}
                handleFileChange={handleFileChange}
            />

            {/* Main Form */}
            <form onSubmit={handleSave} className="container mx-auto max-w-4xl w-full">
                <div className="bg-white p-6 sm:p-8 rounded-xl shadow-lg space-y-6">
                    
                    {/* Personal Information Section */}
                    <PersonalInfoSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        sectionHeaderColorClass={sectionHeaderColorClass}
                        focusRingColorClass={focusRingColorClass}
                        genderOptions={genderOptions}
                    />

                    {/* Educational Information Section */}
                    <EducationalInfoSection
                        formData={formData}
                        handleEducationChange={handleEducationChange}
                        handleEducationFloatInputChange={handleEducationFloatInputChange}
                        sectionHeaderColorClass={sectionHeaderColorClass}
                        focusRingColorClass={focusRingColorClass}
                        curriculumOptions={curriculumOptions}
                    />

                    {/* Tuition Information Section */}
                    <TuitionInfoSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        sectionHeaderColorClass={sectionHeaderColorClass}
                        focusRingColorClass={focusRingColorClass}
                        placeOfTutoringOptions={placeOfTutoringOptions}
                    />

                    {/* How Did You Know Section */}
                    <HowDidYouKnowSection
                        formData={formData}
                        handleInputChange={handleInputChange}
                        sectionHeaderColorClass={sectionHeaderColorClass}
                        focusRingColorClass={focusRingColorClass}
                        howDidYouKnowOptions={howDidYouKnowOptions}
                    />

                    {/* Form Actions */}
                    <FormActions
                        message={message}
                        saving={saving}
                        handleCancel={handleCancel}
                        primaryColorClass={primaryColorClass}
                        hoverColorClass={hoverColorClass}
                        focusRingColorClass={focusRingColorClass}
                    />
                </div>
            </form>
        </div>
    );
};

export default TutorProfileEditView;