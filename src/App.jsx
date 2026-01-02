// APP.JSX
import { useEffect, lazy, Suspense } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";

const LoadingFallback = () => (
  <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#1e293b', color: 'white' }}>
    Loading...
  </div>
);



// General Pages
const LandingPage = lazy(() => import("./pages/control/LandingPageController"));
const SignUpFrame = lazy(() => import("./pages/control/SignUp"));
const TermsAndConditions = lazy(() => import("./pages/TermsAndConditions"));

// Authentication Pages
const ForgotPass = lazy(() => import("./pages/control/ForgotPass"));
const ResetPass = lazy(() => import("./pages/control/ResetPassController"));

// Guardian Pages
const Guardian = lazy(() => import("./pages/control/Guardian"));
const PostJob = lazy(() => import("./pages/control/PostJobController"));
const PreviousJobs = lazy(() => import("./pages/control/PreviousJobController"));
const ShortList = lazy(() => import("./pages/control/ShortListController"));
const GuardianProfile = lazy(() => import("./pages/control/GuardianProfile")); 
const GuardianProfileEdit = lazy(() => import("./pages/control/GuardianProfileEdit")); 
const RecommendedTutors = lazy(() => import("./pages/control/RecommendedTutorsController"));
const AdminPortal = lazy(() => import("./pages/control/AdminPortal"));

const GuardianShortlisted = lazy(() => import("./pages/control/ShortListController"));
const RecommendedTutorDetails = () => {
    return <div className="p-10 text-center text-xl">Recommended Tutor Details Page (Placeholder for individual view)</div>;
};

// Tutor Pages
const Tutor = lazy(() => import("./pages/control/Tutor"));
const TutorProfile = lazy(() => import("./pages/control/TutorProfile"));
const TutorProfileEdit = lazy(() => import("./pages/control/TutorProfileEdit"));
const TutorAcceptedJobs = () => <div className="p-10 text-center text-xl">Tutor Accepted Jobs Page (Placeholder)</div>;
const TutorEarnings = () => <div className="p-10 text-center text-xl">Tutor Earnings Page (Placeholder)</div>;
const JobCardView = lazy(() => import("./pages/view/JobCardView"));
const DuesController = lazy(() => import('./pages/control/DuesController'));
// Media Pages (New)
const Media = lazy(() => import("./pages/control/Media"));
const MediaProfile = lazy(() => import("./pages/control/MediaProfileController"));
const MediaPostJob = () => <div className="p-10 text-center text-xl">Media Partner Post Job Page (Placeholder)</div>;
const MediaProfileEdit = lazy(() => import("./pages/control/MediaProfileEditController"));
const MediaBrowseTutors = lazy(() => import("./pages/view/MediaBrowseTutorView"));


function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "Toppers Trust"; 
    let metaDescription = "Connecting students and tutors effectively."; // Default description

    const pageInfo = new Map([
        ["/", { title: "Toppers Trust | Find Best Tutors in BD", description: "Toppers Trust is the fastest growing tuition finder platform in Bangladesh. Right tutor. Right guidance. Real results — trusted by thousands of toppers nationwide!" }],
        ["/sign-up-frame", { title: "Sign Up - Toppers Trust", description: "Create your Toppers Trust account as a student, guardian, or tutor." }],
        ["/terms-and-conditions", { title: "Terms & Conditions - Toppers Trust", description: "Read the terms and conditions for using the Toppers Trust platform." }],
        ["/forgot-pass", { title: "Forgot Password - Toppers Trust", description: "Reset your Toppers Trust account password." }],
        ["/update-password", { title: "Reset Password - Toppers Trust", description: "Set a new password for your Toppers Trust account." }],
        // Guardian Routes
        ["/guardian-dashboard", { title: "Guardian Dashboard - Toppers Trust", description: "Manage your tutoring needs as a guardian on Toppers Trust." }],
        ["/guardian/shortlisted", { title: "Shortlisted Tutors - Toppers Trust", description: "View your shortlisted tutors." }],
        ["/guardian/profile/edit", { title: "Edit Profile - Guardian - Toppers Trust", description: "Edit your guardian profile information." }], // Keep placeholder route for now
        ["/guardian/post-job", { title: "Post a Job - Toppers Trust", description: "Post a new tutoring job requirement." }],
        ["/guardian/previous-jobs", { title: "My Posted Jobs - Toppers Trust", description: "View your history of posted jobs." }],
        ["/guardian/shortlist", { title: "Shortlist - Toppers Trust", description: "Review applicants and appoint tutor." }],
        // Tutor Routes
        ["/tutor-dashboard", { title: "Tutor Dashboard - Toppers Trust", description: "Manage your tutoring services and profile on Toppers Trust." }],
        ["/tutor/accepted-jobs", { title: "Accepted Jobs - Tutor - Toppers Trust", description: "View your accepted tutoring jobs." }],
        ["/tutor/earnings", { title: "Earnings - Tutor - Toppers Trust", description: "View your tutoring earnings." }],
        ["/tutor/profile", { title: "My Profile - Tutor - Toppers Trust", description: "View and manage your tutor profile." }], // Keep placeholder route for now
        ["/tutor/profile/edit", { title: "Edit Profile - Tutor - Toppers Trust", description: "Edit your tutor profile information." }], // Keep placeholder route for now
        
        
        // Media Routes (New)
        ["/media-dashboard", { title: "Media Partner Dashboard - Toppers Trust", description: "Manage your profile and job posts as a media partner." }],
        ["/media/profile", { title: "My Profile - Media Partner - Toppers Trust", description: "View and manage your media partner profile." }],
        ["/media/post-job", { title: "Post a Job - Media Partner - Toppers Trust", description: "Post a new job or advertisement opportunity." }],
        ["/media/browse-tutors", { title: "Browse Tutors - Media Partner - Toppers Trust", description: "Browse and accept tutors for your media platform." }],

    ]);

    const dynamicRouteMatch = (path) => {
        if (path.startsWith("/recommended-tutor/")) return { title: "Recommended Tutor - Toppers Trust", description: "Details of a recommended tutor." };
        return null;
    }

    const info = pageInfo.get(pathname) || dynamicRouteMatch(pathname);
    if (info) {
        title = info.title;
        metaDescription = info.description;
    }

    if (document.title !== title) { document.title = title; }
    const metaDescriptionTag = document.querySelector('head > meta[name="description"]');
    if (metaDescriptionTag && metaDescriptionTag.content !== metaDescription) { metaDescriptionTag.content = metaDescription; }
    else if (!metaDescriptionTag && metaDescription) {
      const newMetaTag = document.createElement('meta');
      newMetaTag.name = "description";
      newMetaTag.content = metaDescription;
      document.head.appendChild(newMetaTag);
    }
  }, [pathname]);

  return (
    <Suspense fallback={<LoadingFallback />}>
      <Routes>
        {/* General Pages */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/sign-up-frame" element={<SignUpFrame />} />
        <Route path="/terms-and-conditions" element={<TermsAndConditions />} />

        {/* Authentication Routes */}
        <Route path="/forgot-pass" element={<ForgotPass />} />
        <Route path="/update-password" element={<ResetPass />} />

        {/* Guardian Specific Routes */}
        <Route path="/guardian-dashboard" element={<Guardian />} />
        <Route path="/guardian/post-job" element={<PostJob />} />
        <Route path="/guardian/previous-jobs" element={<PreviousJobs />} />
        <Route path="/guardian/shortlisted" element={<ShortList />} />
        <Route path="/recommended-tutor/:tutorId" element={<RecommendedTutorDetails />} />
        <Route path="/guardian/profile" element={<GuardianProfile />} /> 
        <Route path="/guardian/profile/edit" element={<GuardianProfileEdit />} />
        <Route path="/guardian/recommended-tutors" element={<RecommendedTutors />} />
        <Route path="/browse-tutors" element={<RecommendedTutors />} />


        {/* Tutor Specific Routes */}
        <Route path="/tutor-dashboard" element={<Tutor />} />
        <Route path="/tutor/accepted-jobs" element={<TutorAcceptedJobs />} />
        <Route path="/tutor/earnings" element={<TutorEarnings />} />
        <Route path="/tutor/dues" element={<DuesController />} />
        <Route path="/tutor/profile" element={<TutorProfile />} />        <Route path="/tutor/profile/edit" element={<TutorProfileEdit />} />        <Route path="/job-card" element={<JobCardView />} />
        <Route path="/media-dashboard" element={<Media />} />
        <Route path="/media/profile" element={<MediaProfile />} />
        <Route path="/media/profile/edit" element={<MediaProfileEdit />} />
        <Route path="/media/post-job" element={<MediaPostJob />} />
        <Route path="/media/browse-tutors" element={<MediaBrowseTutors />} />
          {/* Admin Specific Routes */}
        <Route path="/admin-portal" element={<AdminPortal />} />



      </Routes>
    </Suspense>
  );
}
export default App;


