import { motion } from "framer-motion";
import { useState, useRef } from "react";
import gsap from "gsap";
import { useToast } from "@/hooks/use-toast";
import { services } from "@/data/services";
import { handleContactSubmit } from "@/lib/utils";

export function FooterForm() {
  return (
    <>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const data = Object.fromEntries(formData);
          await handleContactSubmit(data);
        }}
      >
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="email" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" required></textarea>
        <button type="submit">Send Message</button>
      </form>
    </>
  );
}
