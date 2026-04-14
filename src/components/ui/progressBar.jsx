export default function ProgressBar({ percent }) {
  return (
    <div className="w-full bg-primary-300 rounded-lg my-5">
      <div
        className="bg-green-700 h-[10px] rounded-lg transition-all duration-300"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
}