// Model: PostJobModel - holds constants and initial state
export const studentCountOptions = Array.from({ length: 10 }, (_, i) => i + 1);
export const mediumOptions = ["", "Bangla", "English Version", "English Medium", "Uni Help", "Madrasha Help"];
export const classOptions = ["", "Playgroup", "Nursery", "Kindergarten", "Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8", "Class 9", "Class 10", "O Level (Cambridge)", "O Level (Edexcel)", "IGCSE", "AS Level (Cambridge)", "AS Level (Edexcel)", "A Level (Cambridge)", "A Level (Edexcel)", "University", "Special Skills"];
export const paymentOptions = ["", "By Month", "Per Class"];
export const daysOptions = ["", "1 Day/Week", "2 Days/Week", "3 Days/Week", "4 Days/Week", "5 Days/Week", "6 Days/Week", "7 Days/Week"];
export const cityOptions = ["", "Dhaka", "Chittagong", "Khulna", "Rajshahi", "Sylhet", "Barisal", "Rangpur", "Mymensingh"];
export const tuitionTypeOptions = ["", "Home Tutoring", "Online Tutoring", "Group Tutoring"];

export const subjectOptions = [
  "", "Bangla", "Bangla 1st Paper", "Bangla 2nd Paper", "English", "English 1st Paper", "English 2nd Paper", "English Language", "English Literature", "General Mathematics", "Higher Mathematics", "Additional Mathematics", "Mathematics A", "Mathematics B", "Pure Mathematics", "Statistics", "Physics", "Physics 1st Paper", "Physics 2nd Paper", "Chemistry", "Chemistry 1st Paper", "Chemistry 2nd Paper", "Biology", "Biology 1st Paper", "Biology 2nd Paper", "Human Biology", "General Science", "Agriculture Studies", "Home Science", "ICT", "Applied ICT", "Computer Science", "Programming (Python/C++)", "Design & Technology",
  "Accounting", "Business Studies", "Commerce", "Finance and Banking", "Economics", "Environmental Management", "Bangladesh and Global Studies", "History", "Modern World History", "Geography", "Geography and Environment", "Civics", "Civics and Citizenship", "Social Science", "Psychology", "Sociology", "Religious Studies", "Religion and Moral Education", "Islamic Studies", "Art & Design", "Physical Education and Health", "Career Education",
  "French", "Spanish", "German", "Arabic", "Mandarin Chinese", "IELTS Preparation", "SAT Preparation", "Guitar Learning", "Piano Learning", "Singing/Vocal", "Premier Pro (Video Editing)", "Photoshop", "Illustrator", "Digital Art", "Web Development", "Mobile App Development", "Robotics", "Debate/Public Speaking", "Creative Writing", "Critical Thinking", "Cambridge Global Perspectives", "Research and Project Work",
  "AS Paper 1", "AS Paper 2", "A2 Paper 3", "A2 Paper 4", "O Level Paper 1", "O Level Paper 2", "Mock Exam Practice"
];

const dhakaThanas = [
  "",
  "Adabor", "Ashulia", "Badda", "Bangshal", "Bhashantek", "Bimanbandar", "Chakbazar",
  "Dakshin Keraniganj", "Dakshinkhan", "Darus Salam", "Demra", "Dhamrai", "Dhanmondi",
  "Dohar", "Gendaria", "Gulshan", "Hazaribagh", "Jatrabari", "Kadamtali", "Kafrul",
  "Kalabagan", "Kamrangirchar", "Keraniganj Model", "Khilgaon", "Khilkhet", "Kotwali",
  "Lalbagh", "Mirpur Model", "Mohammadpur", "Motijheel", "Nawabganj", "New Market",
  "Pallabi", "Paltan", "Ramna", "Rampura", "Sabujbagh", "Savar Model", "Shah Ali",
  "Shahbagh", "Sher-e-Bangla Nagar", "Shyampur", "Sutrapur", "Tejgaon",
  "Tejgaon Industrial Area", "Turag", "Uttar Khan", "Uttara East", "Uttara West",
  "Vatara", "Wari", "Other"
];

export const locationData = {
  Dhaka: dhakaThanas,
  Chittagong: ["", "Agrabad", "Bakolia", "Bandar", "Bayazid Bostami", "Chandgaon", "Chattogram Kotwali", "Double Mooring", "Halishahar", "Karnaphuli", "Khulshi", "Pahartali", "Panchlaish", "Patenga", "Sitakunda", "Other"],
  Khulna: ["", "Daulatpur", "Khalishpur", "Khan Jahan Ali", "Khulna Kotwali", "Sonadanga", "Other"],
  Rajshahi: ["", "Boalia", "Matihar", "Rajpara", "Shah Makhdum", "Other"],
  Sylhet: ["", "Sylhet Kotwali", "Airport", "Dakshin Surma", "Hazrat Shah Paran", "Jalalabad", "Moglabazar", "Other"],
  Barisal: ["", "Barishal Kotwali", "Airport", "Bandar", "Kaunia", "Other"],
  Rangpur: ["", "Rangpur Kotwali", "Gangachhara", "Kaunia", "Pirgachha", "Taraganj", "Other"],
  Mymensingh: ["", "Mymensingh Kotwali", "Bhaluka", "Fulbaria", "Gaffargaon", "Gauripur", "Haluaghat", "Ishwarganj", "Muktagachha", "Nandail", "Phulpur", "Trishal", "Other"],
};

export const initialFormState = {
  noOfStudents: "1",
  tutorGenderPref: "Any",
  salary: "",
  tuitionType: "Home Tutoring",
  studentGender: "",
  city: "Dhaka",
  category: "English Medium",
  subjects: [],
  location: "",
  address: "",
  daysPerWeek: "5 Days/Week",
  startingDate: new Date().toISOString().split("T")[0],
  paymentType: "By Month(1 Month->Salary)",
  classCourse: "Class 8",
  tutoringTime: "",
  details: "",
};
