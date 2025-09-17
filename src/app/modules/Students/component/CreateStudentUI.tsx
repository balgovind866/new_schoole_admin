import { FC, useRef, useState, useEffect } from "react"
import { Form, Formik, FormikHelpers } from "formik"
import { Content } from "../../../../_metronic/layout/components/content"
import { ToolbarWrapper } from "../../../../_metronic/layout/components/toolbar"
import { KTIcon } from "../../../../_metronic/helpers"
import { createStudentSchemas, inits, ICreateStudent } from "../CreateStudentWizartHelper"
import { AddressInfo } from "../steps/AddressInfo"
// Import other step components
import { PersonalInfo } from "../steps/StudentInfo"
import { ParentInfo } from "../steps/ParentsInfo"
import { FeesInfo } from "../steps/FeesInfo"
import {DocumentInfo  } from "../steps/DocumentUpload"
import { Completion } from "../steps/Completion"

const steps = [
  "Student Info",
  "Address Info",
  "Parent Info",
  "Fees Info",
  "Document Upload",
  "Completed",
]

const stepComponents = [
  PersonalInfo,
  AddressInfo,
  ParentInfo,
  FeesInfo,
 DocumentInfo,
  Completion,
]

const CreateStudentUI: FC = () => {
  const stepperRef = useRef<HTMLDivElement | null>(null)
  const [currentStep, setCurrentStep] = useState(0)

  useEffect(() => {
    updateStepClasses()
  }, [currentStep])

  const updateStepClasses = () => {
    const stepperElement = stepperRef.current
    if (!stepperElement) return

    const allNavItems = stepperElement.querySelectorAll('[data-kt-stepper-element="nav"]')
    const allContents = stepperElement.querySelectorAll('[data-kt-stepper-element="content"]')

    allNavItems.forEach((el, index) => {
      el.classList.remove("current", "completed")
      if (index < currentStep) {
        el.classList.add("completed")
      } else if (index === currentStep) {
        el.classList.add("current")
      }
    })

    allContents.forEach((el, index) => {
      if (index === currentStep) {
        el.classList.add("current")
      } else {
        el.classList.remove("current")
      }
    })
  }

  const nextStep = async (
    validateForm: () => Promise<any>,
    setTouched: FormikHelpers<ICreateStudent>["setTouched"]
  ) => {
    const errors = await validateForm()
    const stepSchemaFields = Object.keys(createStudentSchemas[currentStep]?.fields ?? {})

    const hasStepErrors = stepSchemaFields.some((field) =>
      Object.keys(errors).includes(field)
    )

    if (!hasStepErrors) {
      setCurrentStep((prev) => prev + 1)
    } else {
      const touchedFields = stepSchemaFields.reduce((acc, field) => {
        acc[field] = true
        return acc
      }, {} as any)

      setTouched(touchedFields)
    }
  }

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const cancel = () => {
    setCurrentStep(0)
  }

  const handleSubmit = async (values: ICreateStudent) => {
    console.log("🎉 Submitted student:", values)
    setCurrentStep((prev) => prev + 1) // Go to "Completed" screen
  }

  const CurrentStepComponent = stepComponents[currentStep]

  return (
    <>
      <ToolbarWrapper />
      <Content>
        <div className="card m-4 p-0">
          <div className="card-body">
            <div
              ref={stepperRef}
              className="stepper stepper-links d-flex flex-column pt-15"
              id="kt_create_student_stepper"
            >
              {/* Stepper Nav */}
              <div className="stepper-nav mb-5">
                {steps.map((title, index) => (
                  <div
                    key={index}
                    className={`stepper-item${index === 0 ? " current" : ""}`}
                    data-kt-stepper-element="nav"
                  >
                    <h3 className="stepper-title">{title}</h3>
                  </div>
                ))}
              </div>

              <Formik
                initialValues={inits}
                validationSchema={createStudentSchemas[currentStep]}
                onSubmit={handleSubmit}
              >
                {({ validateForm, setTouched }) => (
                  <Form className="mx-auto mw-800px w-100 pt-15 pb-10">
                    {/* Step Content */}
                    <div data-kt-stepper-element="content">
                      <CurrentStepComponent />
                    </div>

                    {/* Footer Buttons */}
                    <div className="d-flex flex-stack pt-15">
                      <div className="d-flex">
                        <button
                          type="button"
                          className="btn btn-lg btn-light-primary me-3"
                          onClick={prevStep}
                          disabled={currentStep === 0}
                        >
                          <KTIcon iconName="arrow-left" className="fs-4 me-1" /> Back
                        </button>
                        <button
                          type="button"
                          className="btn btn-lg btn-light-secondary"
                          onClick={cancel}
                        >
                          <KTIcon iconName="cross" className="fs-4 me-1" /> Cancel
                        </button>
                      </div>
                      {currentStep < steps.length - 1 ? (
                        <button
                          type="button"
                          className="btn btn-lg btn-primary"
                          onClick={() => nextStep(validateForm, setTouched)}
                        >
                          <span className="indicator-label">
                            {currentStep === steps.length - 2 ? "Submit" : "Continue"}
                            <KTIcon iconName="arrow-right" className="fs-3 ms-2 me-0" />
                          </span>
                        </button>
                      ) : null}
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </Content>
    </>
  )
}

export { CreateStudentUI }
