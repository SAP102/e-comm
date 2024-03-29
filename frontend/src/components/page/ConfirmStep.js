import { CheckIcon } from '@heroicons/react/24/solid'


export default function ConfirmStep() {
    
    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
      }
    const steps = [
        { id: '01', name: 'Shipping Form', description: 'Vitae sed mi luctus laoreet.', href: '#', status: location.pathname === "/order/Shipping" ? "current" : "complete"  },
        { id: '02', name: 'Shipping details', description: 'Cursus semper viverra.', href: '#', status:  location.pathname === "/process/payment" ? location.pathname === "/order/confirmorder" ?"current" : 'complete' : location.pathname === "/order/confirmorder" ? "current" : "upcoming" },
        { id: '03', name: 'Payment', description: 'Penatibus eu quis ante.', href: '#', status: location.pathname === "/process/payment" ? "current" : "upcoming" },
      ]
   
  return (
    <div className="lg:border-t mt-5 lg:border-b lg:border-gray-200">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Progress">
        <ol
          role="list"
          className="overflow-hidden rounded-md lg:flex lg:rounded-none lg:border-l lg:border-r lg:border-gray-200"
        >
          {steps.map((step, stepIdx) => (
            <li key={step.id} className="relative overflow-hidden lg:flex-1">
              <div
                className={classNames(
                  stepIdx === 0 ? 'border-b-0 rounded-t-md' : '',
                  stepIdx === steps.length - 1 ? 'border-t-0 rounded-b-md' : '',
                  'border border-gray-200 overflow-hidden lg:border-0'
                )}
              >
                {step.status === 'complete' ? (
                  <div  className="group">
                    <span
                      className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                          <CheckIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium">{step.name}</span>
                        <span className="text-sm font-medium text-gray-500">{step.description}</span>
                      </span>
                    </span>
                  </div>
                ) : step.status === 'current' ? (
                  <div  aria-current="step">
                    <span
                      className="absolute top-0 left-0 h-full w-1 bg-indigo-600 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-indigo-600">
                          <span className="text-indigo-600">{step.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-indigo-600">{step.name}</span>
                        <span className="text-sm font-medium text-gray-500">{step.description}</span>
                      </span>
                    </span>
                  </div>
                ) : (
                  <div className="group">
                    <span
                      className="absolute top-0 left-0 h-full w-1 bg-transparent group-hover:bg-gray-200 lg:bottom-0 lg:top-auto lg:h-1 lg:w-full"
                      aria-hidden="true"
                    />
                    <span
                      className={classNames(
                        stepIdx !== 0 ? 'lg:pl-9' : '',
                        'px-6 py-5 flex items-start text-sm font-medium'
                      )}
                    >
                      <span className="flex-shrink-0">
                        <span className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gray-300">
                          <span className="text-gray-500">{step.id}</span>
                        </span>
                      </span>
                      <span className="mt-0.5 ml-4 flex min-w-0 flex-col">
                        <span className="text-sm font-medium text-gray-500">{step.name}</span>
                        <span className="text-sm font-medium text-gray-500">{step.description}</span>
                      </span>
                    </span>
                  </div>
                )}
                {stepIdx !== 0 ? (
                  <>
                    {/* Separator */}
                    <div className="absolute inset-0 top-0 left-0 hidden w-3 lg:block" aria-hidden="true">
                      <svg
                        className="h-full w-full text-gray-300"
                        viewBox="0 0 12 82"
                        fill="none"
                        preserveAspectRatio="none"
                      >
                        <path d="M0.5 0V31L10.5 41L0.5 51V82" stroke="currentcolor" vectorEffect="non-scaling-stroke" />
                      </svg>
                    </div>
                  </>
                ) : null}
              </div>
            </li>
          ))}
        </ol>
      </nav>
    </div>
  )
}
