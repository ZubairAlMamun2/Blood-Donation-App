import { useState } from "react";
import { FaEnvelope, FaPhone, FaWhatsapp, FaUser, FaComment } from "react-icons/fa";
import Swal from "sweetalert2";
import emailjs from "@emailjs/browser";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    emailjs
      .send("service_yx9rea4", "template_2gxrglu", formData, "oHRFApaPTor9avKtz")
      .then(
        () => {
          setStatus("Message sent successfully!");
          setFormData({ name: "", message: "", email: "" });
          Swal.fire({
            title: "Your message is received!",
            icon: "success",
            draggable: true,
          });
          e.target.reset();
        },
        (error) => {
          setStatus("Failed to send message. Try again.");
          console.error("EmailJS Error:", error);
        }
      );
  };

  return (
    <section id="contact" className="min-h-screen container mx-auto flex flex-col items-center justify-center text-black bg-white   md:w-full my-4">
      <h2 className="text-4xl font-bold text-center mb-3 text-red-600">Contact Us</h2>
      <p className=" text-black text-center p-2 mb-8">Got a question? Send me a message, and I'll get back to you soon.</p>

      <div className="grid md:px-4 md:grid-cols-2 gap-8 md:container md:mx-auto">
        {/* Contact Info */}
        <div className="bg-white text-black p-6 rounded-xl shadow-lg">
          <h3 className="text-xl text-red-600 font-semibold mb-4">Get in Touch</h3>
          <p className="mb-4">Have something to discuss? Send me an email or contact me via phone.</p>

          <div className="space-y-4">
            <div className="flex items-center md:space-x-3">
              <FaEnvelope className="text-xl text-black" />
              <a href="mailto:zubairalmamun888@gmail.com" className="text-lg text-black hover:underline">
                zubairalmamun888@gmail.com
              </a>
            </div>

            <div className="flex items-center md:space-x-3">
              <FaPhone className="text-xl text-black" />
              <span className="text-lg">+880 1754163888</span>
            </div>

            <div className="flex items-center md:space-x-3">
              <FaWhatsapp className="text-xl text-green-500" />
              <a href="https://web.whatsapp.com/" target="_blank" rel="noopener noreferrer" className="text-lg text-green-500 hover:underline">
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4 text-red-600 flex items-center">
            <FaComment className="mr-2" /> Send a Message
          </h3>

          <form onSubmit={handleSubmit}>
            <label className="block mb-3">
              <span className="text-sm font-medium text-black">👤 Name *</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 rounded border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your name"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm font-medium text-black">📧 Email *</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 rounded border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Enter your email"
              />
            </label>

            <label className="block mb-3">
              <span className="text-sm font-medium text-black">💭 Message *</span>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-1 p-2 rounded border border-red-400 focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Write your message here..."
                rows="4"
              />
            </label>

            <button
              type="submit"
              className="w-full mt-4 bg-red-600 hover:bg-red-500 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
