import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import EmployeeHeader from "./EmployeeHeader";

const TermsAndConditions = () => {
  const user = useSelector((store) => store.user.user);

  // Always scroll to top when opening legal pages
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header Container - Standardized Z-Index */}
      <div className="fixed top-0 left-0 right-0 z-50">
        {!user ? <Header /> : <EmployeeHeader />}
      </div>

      {/* Main Content Area:
         - pt-32: Clearance for mobile header
         - lg:pt-48: Clearance for desktop header
         - flex-grow: Pushes footer down
      */}
      <main className="flex-grow pt-32 md:pt-40 lg:pt-48 pb-12 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {/* Container Box - Responsive Padding */}
          <div className="bg-white shadow-sm border border-gray-200 rounded-2xl p-6 md:p-10">
            {/* Header Section */}
            <header className="border-b border-gray-100 pb-6 mb-8 text-center">
              <h1 className="text-2xl md:text-4xl font-black text-gray-900 uppercase tracking-tight">
                Terms and Conditions
              </h1>
            </header>

            {/* Terms Content */}
            <div className="space-y-6">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
                <h2 className="text-lg font-bold text-gray-800">
                  User Agreement
                </h2>
                <p className="text-xs font-medium text-gray-400 bg-gray-100 px-3 py-1 rounded-full w-fit">
                  Last Updated: 29th April, 2022
                </p>
              </div>

              <div className="prose prose-blue max-w-none text-gray-600 leading-relaxed space-y-4 text-sm md:text-base">
                <p>
                  These terms and conditions (<strong>Terms</strong>) govern the
                  use of services made available on or through{" "}
                  <a
                    href="https://www.servify.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    servify.com
                  </a>{" "}
                  and/or the Servify Company mobile app (collectively, the{" "}
                  <strong>Platform</strong>).
                </p>

                <p>
                  These Terms also include our{" "}
                  <a
                    href="/privacy-policy"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Privacy Policy
                  </a>
                  , and any guidelines, additional, or supplemental terms,
                  policies, and disclaimers made available or issued by us from
                  time to time.
                </p>

                <div className="p-4 bg-blue-50 rounded-xl border-l-4 border-blue-500 italic text-gray-700">
                  "In the event of a conflict between these Terms and the
                  Supplemental Terms, the Supplemental Terms will prevail."
                </div>

                <p>
                  The Terms constitute a binding and enforceable legal contract
                  between{" "}
                  <strong>Servify</strong>{" "}
                  (registered address at New Delhi 110016) and you, the user of
                  the Services.
                </p>

                <p>
                  By using the Services, you represent and warrant that you have
                  full legal capacity and authority to agree to and bind
                  yourself to these Terms. If you represent any other person,
                  you confirm that you have the necessary power to bind such
                  person.
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
