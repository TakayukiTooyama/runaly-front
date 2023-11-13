export function FileUpload() {
  return (
    <div className='mx-auto flex w-full justify-center sm:max-w-lg'>
      <div className='my-20 flex h-auto w-full flex-col items-center justify-center bg-white sm:w-3/4 sm:rounded-lg sm:shadow-xl'>
        <div className='my-10 text-center'>
          <h2 className='mb-2 text-2xl font-semibold'>Upload your files</h2>
          <p className='text-xs text-gray-500'>
            File should be of format .mp4, .avi, .mov or .mkv
          </p>
        </div>
        <form
          action='#'
          className='relative mb-10 h-32 w-4/5 max-w-xs rounded-lg bg-gray-100 shadow-inner'
        >
          <input type='file' id='file-upload' className='hidden' />
          <label
            htmlFor='file-upload'
            className='z-20 flex h-full w-full cursor-pointer flex-col-reverse items-center justify-center'
          >
            <p className='z-10 text-center text-xs font-light text-gray-500'>
              Drag & Drop your files here
            </p>
            <svg
              className='z-10 h-8 w-8 text-indigo-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path d='M2 6a2 2 0 012-2h5l2 2h5a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z'></path>
            </svg>
          </label>
        </form>
      </div>
    </div>
  )
}
