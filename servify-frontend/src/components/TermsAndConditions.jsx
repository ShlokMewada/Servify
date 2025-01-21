import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useSelector } from "react-redux";
import EmployeeHeader from "./EmployeeHeader";

const TermsAndConditions = () => {
  const user = useSelector((store) => store.user.user);
  return (
    <div className="py-36">
      <div className="fixed top-0 left-0 right-0 z-10">
        {!user ? <Header /> : <EmployeeHeader />}
      </div>
      <div className="flex justify-center items-center min-h-screen">
        {/* Container Box */}
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-4xl w-full">
          {/* Header Section */}
          <header className="flex justify-between items-center border-b border-gray-300 pb-4 mb-6">
            {/* Header Text */}
            <h1 className="text-3xl font-bold text-gray-900 text-center flex-grow">
              TERMS AND CONDITIONS
            </h1>
          </header>

          {/* Terms Content */}
          <main className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800">
              TERMS AND CONDITIONS
            </h2>
            <p className="text-sm text-gray-500">
              Last Updated:{" "}
              <strong>
                29<sup>th</sup> April, 2022
              </strong>
            </p>

            <p className="leading-relaxed text-gray-700">
              These terms and conditions (<strong>Terms</strong>) govern the use
              of services made available on or through{" "}
              <a
                href="https://www.servifycompany.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                https://www.servifycompany.com
              </a>{" "}
              and/or the servify Company mobile app (collectively, the{" "}
              <strong>Platform</strong>), and together with the services made
              available on or through the Platform, the{" "}
              <strong>Services</strong>. These Terms also include our privacy
              policy, available at{" "}
              <a
                href="https://www.servifycompany.com/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                Privacy Policy
              </a>
              , and any guidelines, additional, or supplemental terms, policies,
              and disclaimers made available or issued by us from time to time (
              <strong>Supplemental Terms</strong>). The Privacy Policy and the
              Supplemental Terms form an integral part of these Terms. In the
              event of a conflict between these Terms and the Supplemental Terms
              with respect to applicable Services, the Supplemental Terms will
              prevail.
            </p>

            <p className="leading-relaxed text-gray-700">
              The Terms constitute a binding and enforceable legal contract
              between servifyClap Technologies Private Limited (a company
              incorporated under the Companies Act, 2013 with its registered
              address at R-5, PNR House Green Park Market, New Delhi 110016, and
              its principal place of business at 416, Udyog Vihar III, Sector
              20, Gurugram, Haryana 122008 and its affiliates (
              <strong>UC</strong>, <strong>we</strong>, <strong>us</strong>, or{" "}
              <strong>our</strong>), and you, a user of the Services, or any
              legal entity that books Pro Services (defined below) on behalf of
              end-users (<strong>you</strong> or <strong>Customer</strong>). By
              using the Services, you represent and warrant that you have full
              legal capacity and authority to agree to and bind yourself to
              these Terms. If you represent any other person, you confirm and
              represent that you have the necessary power and authority to bind
              such person to these Terms.
            </p>
          </main>
        </div>
      </div>
      <div className="bottom-0 left-0 right-0 -mb-36">
        <Footer />
      </div>
    </div>
  );
};

export default TermsAndConditions;
