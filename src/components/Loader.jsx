function Loader({ message = 'Loading data from NASA...' }) {
  return (
    <div className="flex flex-col items-center justify-center py-12">
      <div className="loader mb-4"></div>
      <p className="text-space-teal font-futuristic">{message}</p>
    </div>
  )
}

export default Loader