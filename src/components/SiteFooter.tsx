export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
        <div>
          <p className="font-display text-base text-foreground">Maya Chen</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Mobile app designer & developer · Based in Lisbon
          </p>
        </div>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <a href="mailto:hello@mayachen.design" className="transition-colors hover:text-foreground">
            Email
          </a>
          <a href="https://dribbble.com" className="transition-colors hover:text-foreground">
            Dribbble
          </a>
          <a href="https://github.com" className="transition-colors hover:text-foreground">
            GitHub
          </a>
          <a href="https://linkedin.com" className="transition-colors hover:text-foreground">
            LinkedIn
          </a>
        </div>
      </div>
      <div className="border-t border-border/60">
        <p className="mx-auto max-w-6xl px-6 py-4 text-xs text-muted-foreground">
          © {new Date().getFullYear()} Maya Chen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
