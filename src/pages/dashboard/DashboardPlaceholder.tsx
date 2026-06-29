interface DashboardPlaceholderProps {
  title: string;
}

function DashboardPlaceholder({ title }: DashboardPlaceholderProps) {
  return (
    <div className="mx-auto w-full max-w-[1240px] px-5! pb-20! md:px-8! lg:px-10!">
      <section className="rounded-lg border border-[#e5e5ef] bg-white px-6! py-8!">
        <h2 className="text-2xl font-semibold text-black">{title}</h2>
        <p className="mt-2 max-w-xl text-sm text-[#555]">
          This section is ready for its own dedicated view.
        </p>
      </section>
    </div>
  );
}

export default DashboardPlaceholder;
