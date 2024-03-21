import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CodingQuestionsAccordion = ({dummyData}) => {

  return (
    <div>
      <Typography variant="h6">{dummyData.companyName}</Typography>
      {dummyData.questions.map((question, index) => (
        <Accordion key={index}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls={`panel-${index}-content`}
          >
            <Typography>{question.title}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div>
              <Typography>{question.description}</Typography>
              <a href={question.link} target="_blank" rel="noopener noreferrer">Link</a>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  );
};

export default CodingQuestionsAccordion;