import React, { forwardRef } from 'react';
import ClassicTemplate from '../../templates/ClassicTemplate';
import ModernTemplate from '../../templates/ModernTemplate';
import CreativeTemplate from '../../templates/CreativeTemplate';

const Preview = forwardRef(({ resume }, ref) => {
  const templates = {
    classic: ClassicTemplate,
    modern: ModernTemplate,
    creative: CreativeTemplate
  };
  
  const Template = templates[resume.template] || ClassicTemplate;
  
  return (
    <div ref={ref} className="resume-preview">
      <Template resume={resume} />
    </div>
  );
});

export default Preview;