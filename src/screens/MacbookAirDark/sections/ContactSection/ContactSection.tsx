import React, { useState } from "react";
import { Send } from "lucide-react";
import { Input } from "@components/ui/input";
import { Textarea } from "@components/ui/textarea";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import apiService from "@lib/api";

export const ContactSection = (): JSX.Element => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.email.includes("@")) return "Please enter a valid email";
    if (!formData.message.trim()) return "Message is required";
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      setErrorMessage(validationError);
      setSubmitStatus("error");
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 3000);
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const result = await apiService.sendContactForm(formData);
      
      if (result.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "" });
        setTimeout(() => setSubmitStatus("idle"), 3000);
      } else {
        setSubmitStatus("error");
        setErrorMessage(result.error || "Failed to send message");
        setTimeout(() => {
          setSubmitStatus("idle");
          setErrorMessage("");
        }, 5000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
      setErrorMessage("An unexpected error occurred. Please try again.");
      setTimeout(() => {
        setSubmitStatus("idle");
        setErrorMessage("");
      }, 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-16 relative container" aria-label="Contact Jhonatan Souza">
      <div className="mx-auto">
        {/* Decorative elements */}
        <div className="relative mb-8" aria-hidden="true">
          <DecorativeSquares />

          {/* Heading and line - Properly aligned */}
          <div className="">
            <h2 className="font-bold text-[#b65d00] text-5xl">
              contact
            </h2>
            <div className="mt-8 w-full max-w-[950px] h-px">
              <Separator className="bg-white" />
          </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Contact form */}
          <div className="flex-1 space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6" aria-label="Contact form">
              <div>
                <label htmlFor="name" className="sr-only">Name</label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="h-[39px] bg-[#d9d9d966] rounded-xl text-white font-bold placeholder:text-white"
                  placeholder="Enter your name"
                  disabled={isSubmitting}
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">Email</label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="h-[39px] bg-[#d9d9d966] rounded-xl text-white font-bold placeholder:text-white"
                  placeholder="Enter your email"
                  disabled={isSubmitting}
                  required
                  aria-required="true"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">Message</label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="h-[233px] bg-[#d9d9d966] rounded-xl text-white font-bold placeholder:text-white resize-none"
                  placeholder="Enter your message for me"
                  disabled={isSubmitting}
                  required
                  aria-required="true"
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="h-[39px] bg-[#b65d00] hover:bg-[#fb8d27] text-white font-bold rounded-xl transition-colors duration-200 flex items-center gap-2"
                aria-describedby={submitStatus !== "idle" ? "form-status" : undefined}
              >
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    <Send className="w-4 h-4" aria-hidden="true" />
                    Send Message
                  </>
                )}
              </Button>

              {/* Status messages */}
              {submitStatus === "success" && (
                <div id="form-status" className="text-green-400 font-bold text-sm" role="alert">
                  ✅ Message sent successfully! I'll get back to you soon.
                </div>
              )}
              {submitStatus === "error" && (
                <div id="form-status" className="text-red-400 font-bold text-sm" role="alert">
                  ❌ {errorMessage || "Failed to send message. Please try again later."}
                </div>
              )}
            </form>
          </div>

          {/* Social media section */}
          <div className="mt-10 md:mt-0">
            <h3 className="font-bold text-[#dedede] text-base mb-4">
              Follow me on social media
            </h3>
            <nav aria-label="Social media links">
              <div className="space-y-3">
                {/* GitHub link */}
                <a 
                  href="https://github.com/Jhowl/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-transform duration-200 hover:brightness-110"
                  aria-label="Visit Jhonatan's GitHub profile"
                >
                  <GitHubSVG color="#dedede" width={33} height={33} />
                  <span className="font-bold text-[#dedede] text-base">
                    /jhowl
                  </span>
                </a>

                {/* LinkedIn link */}
                <a 
                  href="https://www.linkedin.com/in/jhonatan1/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 transition-transform duration-200 hover:brightness-110"
                  aria-label="Visit Jhonatan's LinkedIn profile"
                >
                  <LinkedinSVG color="#dedede" width={33} height={33} />
                  <span className="font-bold text-[#dedede] text-base">
                    /jhonatan1
                  </span>
                </a>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </section>
  );
};

interface IconProps {
  color: string
  width: number
  height: number
}

const LinkedinSVG = ({ color, width, height }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-linkedin-icon lucide-linkedin">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
)

const GitHubSVG = ({ color, width, height }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 24 24" fill="none" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-github-icon lucide-github">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/>
    <path d="M9 18c-4.51 2-5-2-7-2"/>
  </svg>
)

const DecorativeSquares = () => {
  const cs = "absolute rounded-[25px] border-2 border-solid border-[#dedede] bg-[#000002]"
  return (
    <div className="absolute w-[171px] h-[284px] top-[-70px] left-[-190px]">
      <div className={`w-[120px] h-[154px] top-[100px] left-[22px] animate-pulse ${cs}`} />
      <div className={`w-[105px] h-[105px] top-[29px] left-[19px] ${cs}`} />
      <div className={`w-[83px] h-[69px] top-28 left-0 animate-floatY ${cs}`} />
      <div className={`w-[81px] h-[78px] top-0 left-[90px] animate-floatWiggle ${cs}`} />
    </div>
  )
}
