export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
        <div>
          <p className="font-display text-base text-foreground">Adesola Adeyemi</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Mobile app designer & developer · Based in Nigeria
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:aminatadeyemi42@gmail.com" className="transition-colors hover:text-foreground">
            Email
          </a>
          <a href="https://dribbble.com/Desol_Designs" className="transition-colors hover:text-foreground">
            Dribbble
          </a>
          <a href="https://github.com/Adesola-create" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/adeyemiaminatadesola" className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Adesola Adeyemi. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
