const ContactSection = () => {
  return (
    <div id="contact" className="cv-section !border-b-0 !pt-8 !pb-0">
      <div className="pt-3 border-t border-border">
        <div className="flex flex-col gap-2 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-center gap-1.5 flex-wrap">
            Inspired by
            <a href="https://stepcv.framer.website/" target="_blank" rel="noopener noreferrer" className="font-semibold text-foreground hover:opacity-70 transition-opacity">
              Thaer Swailem
            </a>
          </p>
          <p>Copyright 2026, All Rights Reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default ContactSection;
