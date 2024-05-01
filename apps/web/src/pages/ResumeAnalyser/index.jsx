import ResumeAnalysisLayout from "@/Layouts/ResumeAnalysisLayout";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const CenteredContainer = styled('div')({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%', // Adjust height as needed
});


const CenteredContainerForSuggestions = styled('div')({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '5%',
    marginRight:'-800px' // Adjust height as needed
  });

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function Index() {
  return (
    <ResumeAnalysisLayout>
      <div style={{ display: "flex", height: "100vh", width: '100vh' }}>
        <div style={{ flex: 1, borderRight: 'solid' }}>
          <CenteredContainer>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
              name="fileupload"
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </CenteredContainer>
        </div>
        <div style={{ flex: 1 }}>
          {
            
            
            <CenteredContainerForSuggestions>
            <h2>Suggestions</h2>
            </CenteredContainerForSuggestions>
          }
        </div>
      </div>
    </ResumeAnalysisLayout>
  );
}
