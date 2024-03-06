import {
  motion,
  AnimatePresence,
  type Variants,
  type Transition,
} from 'framer-motion'

const checkmarkVariants: Variants = {
  hide: {
    pathLength: 0,
  },
  show: {
    pathLength: 1,
  },
}

const checkmarkTransition: Transition = {
  duration: 0.3,
  delay: 0.15,
  ease: 'easeOut',
  type: 'tween',
}

const stepperVariants: Variants = {
  inactive: {
    backgroundColor: '#f1f1f1',
    borderColor: '#e0e0e0',
    color: '#e0e0e0',
  },
  current: {
    backgroundColor: '#f1f1f1',
    borderColor: '#C3002F',
    color: '#C3002F',
  },
  checked: {
    backgroundColor: '#C3002F',
    borderColor: '#C3002F',
    color: 'rgba(195, 0, 47, 0)',
  },
}

const getStatus = (step: number, currentStep: number) => {
  if (step < currentStep) return 'checked'
  if (step === currentStep) return 'current'
  return 'inactive'
}

export function Stepper({
  step,
  currentStep,
}: {
  step: number
  currentStep: number
}) {
  const status = getStatus(step, currentStep)

  return (
    <motion.div
      className='relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-blue-600 font-semibold text-blue-600'
      variants={stepperVariants}
      animate={status}
    >
      <span>{step + 1}</span>
      <AnimatePresence>
        {step < currentStep && (
          <div className='absolute left-0 top-0 flex h-full w-full items-center justify-center text-gray-100'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth='1.5'
              stroke='currentColor'
              className='h-6 w-6'
            >
              <motion.path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M4.5 12.75l6 6 9-13.5'
                variants={checkmarkVariants}
                initial='hide'
                animate='show'
                transition={checkmarkTransition}
              />
            </svg>
          </div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
