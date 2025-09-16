export const Completion = () => {
  return (
    <div className="text-center p-5">
      <h3 className="mb-3 text-success">🎉 Student Created Successfully!</h3>
      <p className="mb-4">
        You have successfully submitted all the details.  
        You can now view the student in the student list.
      </p>
      <button
        className="btn btn-primary"
        onClick={() => window.location.reload()}
      >
        Create Another Student
      </button>
    </div>
  );
};