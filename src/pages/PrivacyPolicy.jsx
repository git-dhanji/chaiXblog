import { useDynamicTitle } from "../components";


const PrivacyPolicy = () => {
  useDynamicTitle();
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
      <div className="text-lg leading-relaxed">
        <p>
          This Privacy Policy describes how your personal information is collected, used, and shared when you visit our blog website (the “Site”).
        </p>
        <h2 className="text-xl font-bold mt-6 mb-2">Information We Collect</h2>
        <p>
          When you visit the Site, we automatically collect certain information about your device, including information about your web browser, IP address, time zone, and some of the cookies that are installed on your device. Additionally, as you browse the Site, we collect information about the individual web pages or products that you view, what websites or search terms referred you to the Site, and
        </p>
        {/* Add more privacy policy content as needed */}

        <h2 className="text-xl font-bold mt-6 mb-2">Rules</h2>
        <ul className="list-disc ml-6">
          <li>No spamming or advertising on the website.</li>
          <li>Respect other users and refrain from any form of harassment or hate speech.</li>
          <li>Do not distribute unauthorized content or engage in any illegal activities.</li>
          <li>Protect your account credentials and do not share them with others.</li>
          {/* Add more rules as needed */}
        </ul>

        <h2 className="text-xl font-bold mt-6 mb-2">Copyright</h2>
        <p>
          All content provided on this blog is for informational purposes only. The owner of this blog makes no representations as to the accuracy or completeness of any information on this site or found by following any link on this site. The owner will not be liable for any errors or omissions in this information nor for the availability of this information. The owner will not be liable for any losses, injuries, or damages from the display or use of this information.
        </p>
        <p>
          This blogs content is the property of the blog owner and is protected by copyright law. You may not reproduce, distribute, or transmit any part of this blog in any form or by any means without prior written permission from the blog owner.
        </p>
      </div>
    </div>
  );
}

export default PrivacyPolicy;
