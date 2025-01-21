import { useSelector } from "react-redux";
import Footer from "./Footer";
import Header from "./Header";
import EmployeeHeader from "./EmployeeHeader";

const PrivacyPolicy = () => {
  const user = useSelector((store) => store.user.user);
  return (
    <div className="py-36">
      <div className="fixed top-0 left-0 right-0 z-10">
        {!user ? <Header /> : <EmployeeHeader />}
      </div>
      <div className="max-w-4xl mx-auto mt-10 p-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-center">Privacy Policy</h1>

        {/* Last updated date with underline */}
        <div className="flex flex-col items-center">
          <p className="text-sm text-gray-500">
            Last updated: 31st January, 2022
          </p>

          <hr className="border-t-2 border-gray-400 w-full mt-2" />
        </div>

        <section className="mt-6">
          <h2 className="text-xl font-semibold">
            Welcome to Servify Company’s privacy policy
          </h2>
          <p className="mt-6 text-gray-700">
            <span className="font-bold">
              Servify Technologies India Private Limited
            </span>{" "}
            and its affiliates (collectively, Servify Company, we or us) are
            engaged in the business of providing web-based solutions to
            facilitate connections between customers that seek specific services
            and service professionals that offer these services. This Policy
            outlines our practices in relation to the collection, storage,
            usage, processing, and disclosure of personal data that you have
            consented to to share with us when you access, use, or otherwise
            interact with our website available at https://www.servify.com/ or
            mobile application servify Company(collectively, Platform) or avail
            products or services that servify Company offers you on or through
            the Platform (collectively, the Services).In this Policy, the
            services offered to you by service professionals on or through the
            Platform are referred to as Professional Services.
          </p>
          <p className="mt-4 text-gray-700">
            At Servify, we are committed to protecting your personal data and
            respecting your privacy. In order to provide you with access to the
            Services or the Professional Services, we have to collect and
            otherwise process certain data about you. This Policy explains how
            we process and use personal data about you. Please note that unless
            specifically defined in this Policy, capitalised terms shall have
            the same meaning ascribed to them in our Terms and Conditions,
            available at https://www.Servifycompany.com/terms (Terms). Please
            read this Policy in consonance with the Terms. By using the
            Services, you confirm that you have read and agree to be bound by
            this Policy and consent to the processing activities described under
            this Policy. Please refer to Section 1 to understand how the terms
            of this Policy apply to you.
          </p>
          <p className="mt-4 text-gray-700">
            <span className="font-bold">1. BACKGROUND AND KEY INFORMATION</span>
            (a) How this Policy applies: This Policy applies to individuals who
            access or use the Services or otherwise avail the Professional
            Services. For the avoidance of doubt, references to you across this
            Policy are to an end user that uses the Platform. By using the
            Platform, you consent to the collection, storage, usage, and
            disclosure of your personal data, as described in and collected by
            us in accordance with this Policy. (b) Review and Updates: We
            regularly review and update our Privacy Policy, and we request you
            to regularly review this Policy. It is important that the personal
            data we hold about you is accurate and current. Please let us know
            if your personal data changes during your relationship with us. (c)
            Third-Party Services: The Platform may include links to third-party
            websites, plug-ins, services, and applications (Third-Party
            Services). Clicking on those links or enabling those connections may
            allow third parties to collect or share data about you. We neither
            control nor endorse these Third-Party Services and are not
            responsible for their privacy statements. When you leave the
            Platform or access third-party links through the Platform, we
            encourage you to read the privacy policy of such third-party service
            providers.
            <p className="mt-4"></p>
            <span className="font-bold">2. PERSONAL DATA THAT WE COLLECT</span>
            (a) We collect different types of personal data about you. This
            includes, but is not limited to: (i) Contact Data, such as your
            mailing or home address, location, email addresses, and mobile
            numbers. (ii) Identity and Profile Data, such as your name, username
            or similar identifiers, photographs, and gender. (iii) Marketing and
            Communications Data, such as your address, email address,
            information posted in service requests, offers, wants, feedback,
            comments, pictures and discussions in our blog and chat boxes,
            responses to user surveys and polls, your preferences in receiving
            marketing communications from us and our third parties, and your
            communication preferences. We also collect your chat and call
            records when you communicate with service professionals through the
            Platform. (iv) Technical Data, which includes your IP address,
            browser type, internet service provider, details of operating
            system, access time, page views, device ID, device type, frequency
            of visiting our website and use of the Platform , website and mobile
            application activity, clicks, date and time stamps, location data,
            and other technology on the devices that you use to access the
            Platform. (v) Transaction Data, such as details of the Services or
            Professional Services you have availed, a limited portion of your
            credit or debit card details for tracking transactions that are
            provided to us by payment processors, and UPI IDs for processing
            payments. (vi) Usage Data, which includes information about how you
            use the Services and Professional Services, your activity on the
            Platform, booking history, user taps and clicks, user interests,
            time spent on the Platform, details about user journey on the mobile
            application, and page views. (b) We also collect, use, and share
            aggregated data such as statistical or demographic data for any
            purpose. Aggregated data could be derived from your personal data
            but is not considered personal data under law as it does not
            directly or indirectly reveal your identity. However, if we combine
            or connect aggregated data with your personal data so that it can
            directly or indirectly identify you, we treat the combined data as
            personal data which will be used in accordance with this Policy. (c)
            What happens if I refuse to provide my personal data? Where we need
            to collect personal data by law, or under the terms of a contract
            (such as the Terms), and you fail to provide that data when
            requested, we may not be able to perform the contract (for example,
            to provide you with the Services). In this case, we may have to
            cancel or limit your access to the Services.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">
              3. HOW DO WE COLLECT PERSONAL DATA?
            </span>
            We use different methods to collect personal data from and about you
            including through: (a) Direct Interactions. You provide us your
            personal data when you interact with us. This includes personal data
            you provide when you: (i) create an account or profile with us; (ii)
            use our Services or carry out other activities in connection with
            the Services; (iii) enter a promotion, user poll, or online surveys;
            (iv) request marketing communications to be sent to you; or (v)
            report a problem with the Platform and/or our Services, give us
            feedback or contact us. (b) Automated technologies or interactions.
            Each time you visit the Platform or use the Services, we will
            automatically collect Technical Data about your equipment, browsing
            actions, and patterns. We collect this personal data by using
            cookies, web beacons, pixel tags, server logs, and other similar
            technologies. We may also receive Technical Data about you if you
            visit other websites or apps that employ our cookies. (c) Third
            parties or publicly available sources. We will receive personal data
            about you from various third parties: (i) Technical data from
            analytics providers such as Facebook and advertising networks; (ii)
            Identity and profile-related Data and Contact Data from service
            professionals, publicly available sources, etc.; (iii) Personal data
            about you from our affiliate entities.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">
              4. HOW DO WE USE YOUR PERSONAL DATA?
            </span>
            (a) We will only use your personal data when the law allows us to.
            Most commonly, we will use your personal data where we need to
            provide you with the Services, enable you to use the Professional
            Services, or where we need to comply with a legal obligation. We use
            your personal data for the following purposes: (i) to verify your
            identity to register you as a user, and create your user account
            with us on the Platform; (ii) to provide the Services to you; (iii)
            to enable the provision of Professional Services to you; (iv) to
            monitor trends and personalise your experience; (v) to improve the
            functionality of our Services based on the information and feedback
            we receive from you; (vi) to improve customer service to effectively
            respond to your Service requests and support needs; (vii) to track
            transactions and process payments; (viii) to send periodic
            notifications to manage our relationship with you including to
            notify you of changes to the Services, send you information and
            updates pertaining to the Services you have availed, and to receive
            occasional company news and updates related to us or the Services;
            (ix) to assist with the facilitation of the Professional Services
            offered to you, including to send you information and updates about
            the Professional Services you have availed; (x) to market and
            advertise the Services to you; (xi) to comply with legal
            obligations; (xii) to administer and protect our business and the
            Services , including for troubleshooting, data analysis, system
            testing, and performing internal operations; (xiii) to improve our
            business and delivery models; (xiv) to perform our obligations that
            arise out of the arrangement we are about to enter or have entered
            with you; (xv) to enforce our Terms; and (xvi) to respond to court
            orders, establish or exercise our legal rights, or defend ourselves
            against legal claims. (b) You agree and acknowledge that by using
            our Services and creating an account with us on the Platform, you
            authorise us, our service professionals, associate partners, and
            affiliates to contact you via email, phone, or otherwise. This is to
            provide the Services to you and ensure that you are aware of all the
            features of the Services and for related purposes. (c) You agree and
            acknowledge that any and all information pertaining to you, whether
            or not you directly provide it to us (via the Services or
            otherwise), including but not limited to personal correspondence
            such as emails, instructions from you, etc., may be collected,
            compiled, and shared by us in order to render the Services to you.
            This may include but not be limited to service professionals who
            provide or seek to provide you with Professional Services, vendors,
            social media companies, third-party service providers, storage
            providers, data analytics providers, consultants, lawyers, and
            auditors. We may also share this information with other entities in
            the servify Company group in connection with the above-mentioned
            purposes. (d) You agree and acknowledge that we may share data
            without your consent, when it is required by law or by any court or
            government agency or authority to disclose such information. Such
            disclosures are made in good faith and belief that it is reasonably
            necessary to do so for enforcing this Policy or the Terms, or in
            order to comply with any applicable laws and regulations.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">5. COOKIES</span>
            (a) Cookies are small files that a site or its service provider
            transfers to your devices hard drive through your web browser (if
            you permit it to) that enables the sites or service providerssystems
            to recognise your browser and capture and remember certain
            information. (b) We use cookies to help us distinguish you from
            other users of the Platform, understand and save your preferences
            for future visits, keep track of advertisements and compile
            aggregate data about site traffic and site interaction so that we
            can offer you a seamless user experience. We may contact third-party
            service providers to assist us in better understanding our site
            visitors. These service providers are not permitted to use the
            information collected on our behalf except to help us conduct and
            improve our business. (c) Additionally, you may encounter cookies or
            other similar devices on certain pages of the Platform that are
            placed by third parties. We do not control the use of cookies by
            third parties. If you send us personal correspondence, such as
            emails, or if other users or third parties send us correspondence
            about your activities or postings on the Platform, we may collect
            such information within a file specific to you.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">
              6. DISCLOSURES OF YOUR PERSONAL DATA
            </span>
            (a) We may share your personal data with third parties set out below
            for the purposes set out in Section 4: (i) Service professionals to
            enable them to provide you with Professional Services; (ii) Internal
            third parties, which are other companies within the servify Company
            group of companies. (iii) External third parties such as: ● trusted
            third parties such as our associate partners, and service providers
            that provide services for us or on our behalf. This includes hosting
            and operating our Platform, providing marketing assistance,
            conducting our business, processing payments and transaction-related
            processes, transmitting content, and providing our Services to you;
            ● analytic service providers and advertising networks that conduct
            web analytics for us to help us improve the Platform. These
            analytics providers may use cookies and other technologies to
            perform their services; ● other registered users on our Platform
            upon your request or where you explicitly consent to such
            disclosure; and ● regulators and other bodies, as required by law or
            regulation. (b) We require all third parties to respect the security
            of your personal data and to treat it in accordance with the law. We
            do not allow our third-party service providers to use your personal
            data for their own purposes and only permit them to process your
            personal data for specified purposes and in accordance with our
            instructions.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">
              7. YOUR RIGHTS IN RELATION TO YOUR PERSONAL DATA
            </span>
            (a) Access and Updating your Personal Data:You hereby warrant that
            all personal data that you provide us with is accurate, up-to-date,
            and true. When you use our Services, we make best efforts to provide
            you with the ability to access and correct inaccurate or deficient
            data, subject to any legal requirements. You can request servify
            Company for a copy of your personal data by sending an email to
            privacy@servifycompany.com. servify Company may take up to 7 (seven)
            working days respond to such request. (b) Opting-out of Marketing
            and Promotional Communications:When we send you marketing and
            promotional content through email, we make best efforts to provide
            you with the ability to opt-out of such communications by using the
            opt-out instructions provided in such emails. You understand and
            acknowledge that it may take us up to 10 (Ten) business days to give
            effect to your opt-out request. Please note that we may still send
            you emails about your user account or any Services you have
            requested or received from us.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">
              8. DELETION OF ACCOUNT AND PERSONAL DATA
            </span>
            (a) Notwithstanding anything contained in the Terms, you may delete
            your account as well as your personal data stored with servify
            Company by sending an email to privacy@servifycompany.com. servify
            Company may take up to 7 (seven) working days to process your
            request. Once your account is deleted, you will lose access to all
            Services. For avoidance of doubt, it is hereby clarified that all
            data with respect to transactions performed by you on the Platform
            will be retained in accordance with applicable law.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">
              9. TRANSFERS OF YOUR PERSONAL DATA
            </span>
            (a) We comply with applicable laws in respect of storage and
            transfers of personal data. As a part of your use of the Services,
            the information and personal data you provide to us may be
            transferred to and stored in countries other than the country you
            are based in. This may happen if any of our servers are from time to
            time located in a country other than the one you are based, or one
            of our vendors, partners, or service providers is located in a
            country other than one you are based in. (b) By submitting your
            information and personal data to us, you agree to the transfer,
            storage, and processing of such information and personal data in the
            manner described above.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">10. DATA SECURITY </span>
            (a) We implement appropriate security measures and
            privacy-protective features on our Platform including encryption,
            password protection, call masking, and physical security measures to
            protect your personal data from unauthorised access and disclosure,
            and follow standards prescribed by applicable law. (b) Where you
            have chosen a password that enables you to access certain parts of
            the Services or Professional Services, you are responsible for
            keeping this password secret and confidential. We will not be
            responsible for any unauthorised use of your information, or for any
            lost, stolen, or compromised passwords, or for any activity on your
            user account due to such unauthorised disclosure of your password.
            In the event your password has been compromised in any manner
            whatsoever, you should promptly notify us to enable us to initiate a
            change of password.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">11. DATA RETENTION</span>
            (a) You agree and acknowledge that your personal data will continue
            to be stored and retained by us for as long as necessary to fulfil
            our stated purpose(s) and for a reasonable period after the
            termination of your account on the Platform or access to the
            Services to comply with our legal rights and obligations. (b) In
            some circumstances, we may aggregate your personal data (so that it
            can no longer be associated with you) for research or statistical
            purposes, in which case we may use this information indefinitely
            without further notice to you.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">12. BUSINESS TRANSITIONS </span>
            You are aware that in the event we go through a business transition,
            such as a merger, acquisition by another organisation, or sale of
            all or a portion of our assets, your personal data might be among
            the assets transferred.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">13. USER GENERATED CONTENT</span>
            We invite you to post content on our Platform, including your
            comments, feedback, pictures, or any other information that you
            would like to be made available on our Platform. Please note that
            such content will be available to all visitors to our Platform and
            may become public. We cannot prevent such information from being
            used in a manner that is contrary to this Policy, applicable laws,
            or your personal privacy, and we disclaim all liability (express or
            implied) in this regard. Further, you agree to comply with all
            applicable laws in relation to the content uploaded or otherwise
            shared by you on our Platform. You understand and acknowledge that
            you will be solely responsible for any information published by you
            on our Platform that violates applicable laws.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">14. UPDATES TO THIS POLICY</span>
            (a) We may occasionally update this Policy. If we make changes to
            this Policy, we will upload the revised policy on the Platform or
            share it with you through other means, such as email. To the extent
            permitted under applicable law, by using our Platform after such
            notice, you consent to updates made to this Policy. (b) We encourage
            you to periodically review this Policy for the latest information on
            our privacy practices.
            <br className="mt-4" />
            <p className="mt-4"></p>
            <span className="font-bold">15. GRIEVANCE OFFICER</span>
            If you have any questions about this Policy, how we process or
            handle your personal data, or otherwise, you may reach out to us,
            with your queries, grievances, feedback, and comments at
            privacy@servifycompany.com or contact our grievance officer whose
            contact details are provided below: Grievance Officers Name: Richa
            Mohanty Rao; Designation: General Counsel Email:
            privacy@servifycompany.com
          </p>
          <p className="mt-4 text-gray-700">
            By using the Services, you confirm that you have read and agree to
            be bound by this Policy.
          </p>
        </section>
      </div>
      <div className="bottom-0 left-0 right-0 -mb-36">
        <Footer />
      </div>
    </div>
  );
};

export default PrivacyPolicy;
