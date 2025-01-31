import React from "react";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { BorderSvg } from "@/icons/BorderSvg";

export default function Footer() {
  return (
    <footer className="bg-white text-PrimaryBackground rounded-3xl lg:rounded-t-full  mt-20 py-8 px-20 lg:px-72">
      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-gray-600 pb-6">
        <div>
          <h3 className="text-gray-400 font-semibold mb-3">BEYONDCHATS</h3>
          <ul className="space-y-2">
            <li>Why BeyondChats</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="text-sm">
          <h3 className="text-gray-400 font-semibold mb-3 text-base">PRODUCTS</h3>
          <ul className="space-y-2">
            <li>Features</li>
            <li>Integrations</li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold mb-3 text-base">PRICING</h3>
          <ul className="space-y-2">
            <li>Startup</li>
            <li>Standard</li>
            <li>Business</li>
            <li>Enterprise</li>
          </ul>
        </div>
        <div>
          <h3 className="text-gray-400 font-semibold mb-3 text-base">RESOURCES</h3>
          <ul className="space-y-2">
            <li>Blogs</li>
            <li>Case studies</li>
            <li>Success stories</li>
            <li>FAQs</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center py-6 text-gray-400">
        <div className="flex items-center space-x-3">
          <button className="bg-PrimaryButton text-black font-semibold px-4 py-2 rounded-md shadow-md hover:bg-gray-200">
            Start your 14 day free trial
          </button>
        </div>

        <div className="flex space-x-4 mt-4 md:mt-0">
          <Linkedin className="w-5 h-5" />
          <Instagram className="w-5 h-5" />
          <Twitter className="w-5 h-5" />
        </div>
      </div>

      <div className="border-t border-gray-600 pt-6 text-center text-gray-400 text-xs">
        <p>BeyondChats 2024. All rights reserved.</p>
        <div className="flex justify-center space-x-4 mt-3">
          <a href="#">Data Security & Privacy Policy</a>
          <a href="#">Terms and Conditions</a>
          <a href="#">Refund Policy</a>
        </div>
      </div>
    </footer>
  );
}
