type Props = {
  label?: string;
  className?: string;
};

export default function BrandLoader({ label = 'Caricamento...', className }: Props) {
  return (
    <div className={`brand-loader ${className ?? ''}`.trim()} role="status" aria-live="polite">
      <span className="brand-loader-spinner" aria-hidden="true" />
      <span className="brand-loader-text">{label}</span>
    </div>
  );
}
