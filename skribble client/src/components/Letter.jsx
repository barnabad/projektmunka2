function Letter({ value, show }) {
  return (
    <div>
      <div className="w-5 border-b border border-white relative">
        <span className="absolute left-1/2 -translate-x-1/2 text-xl -top-7">
          {show ? value : null}
        </span>
      </div>
    </div>
  );
}

export default Letter;
