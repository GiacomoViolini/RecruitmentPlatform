import React, { useState } from "react";

const steps = ["1", "2", "3"];

interface StepperProps {
    steps: number; 
  }

function Stepper2(step: StepperProps) {
  const currentStep = step;
  return (
    <div className="stepper-container">
      <div className="stepper w-40">
        {steps.map((step, index) => (
          <div
            key={step}
            className={`step ${
                index === currentStep.steps - 1
                    ? "active"
                    : index < currentStep.steps - 1
                    ? "completed"
                    : ""
            }`}
            >
      </div>
        ))}
    </div>
    </div>
    );
}

export default Stepper2;