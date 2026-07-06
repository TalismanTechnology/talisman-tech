/** Same blurred backdrop as the hero — darkens the video behind a
 *  section's content so text pops. Parent section must be `relative`. */
export function SectionShadow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 h-[95%] w-[min(1200px,96vw)] -translate-x-1/2 -translate-y-1/2 bg-gray-950 blur-[82px]"
    />
  );
}
