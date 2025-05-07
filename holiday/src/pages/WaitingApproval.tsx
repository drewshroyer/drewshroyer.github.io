
import Header from "@/components/Header";
import Logo from "@/components/Logo";
import { Link } from "react-router-dom";

const WaitingApproval = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-48 h-48 mb-8">
          <img 
            src="/lovable-uploads/df207227-a536-4a88-b720-9bec5213fb54.png" 
            alt="HOLIDAY logo" 
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="max-w-lg">
          <h1 className="text-2xl font-bold mb-4">Application Under Review</h1>
          
          <p className="mb-6 text-gray-700">
            Please wait while we review your application. This community based group vets every 
            member to ensure members have proper referrals and mutuals with our beloved members. 
            Please encourage your referrals to approve your referral request in order to expedite 
            your acceptance.
          </p>
          
          <p className="mb-8">
            In the meantime follow our instagram{" "}
            <Link 
              to="https://www.instagram.com/liketheholidaybutbetter.org_" 
              target="_blank"
              rel="noopener noreferrer" 
              className="text-holiday-red hover:underline"
            >
              @liketheholidaybutbetter.org_
            </Link>
          </p>
          
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              If you believe this is an error, please contact support.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default WaitingApproval;
