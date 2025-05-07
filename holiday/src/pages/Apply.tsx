
import { useState } from "react";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const Apply = () => {
  const { signUp, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    instagram: "",
    referral: "",
    referralCode: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.password || !formData.referral) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    try {
      await signUp(formData.email, formData.password, formData.name);
      
      // The success toast is shown in the auth context
      // The user needs to verify their email before they can log in
    } catch (error) {
      // Error handling is done in the auth context
      console.error("Application submission error:", error);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <main className="container mx-auto p-4 max-w-screen-md">
        <div className="bg-white rounded-2xl border border-holiday-border p-8 max-w-md mx-auto">
          <h1 className="text-2xl font-bold mb-6 text-center">
            APPLY TO BE A MEMBER OF ON HOLIDAY
          </h1>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium mb-1">
                NAME:
              </label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-holiday-border rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium mb-1">
                EMAIL:
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-holiday-border rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block font-medium mb-1">
                PASSWORD:
              </label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-holiday-border rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="instagram" className="block font-medium mb-1">
                INSTAGRAM:
              </label>
              <Input
                id="instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
                className="w-full border border-holiday-border rounded-lg"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="referral" className="block font-medium mb-1">
                REFERRAL (1 required, max 10):
              </label>
              <Textarea
                id="referral"
                name="referral"
                value={formData.referral}
                onChange={handleChange}
                className="w-full border border-holiday-border rounded-lg"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="referralCode" className="block font-medium mb-1">
                REFERRAL CODE:
              </label>
              <Input
                id="referralCode"
                name="referralCode"
                value={formData.referralCode}
                onChange={handleChange}
                className="w-full border border-holiday-border rounded-lg"
                disabled={loading}
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-holiday-red hover:bg-red-600"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default Apply;
