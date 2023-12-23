import { useCallback, useEffect, useMemo, SetStateAction, Dispatch } from 'react';
import { useDropzone } from 'react-dropzone';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

const baseStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  padding: '10px',
  borderWidth: 2,
  borderRadius: 2,
  borderColor: '#eeeeee',
  borderStyle: 'dashed',
  backgroundColor: '#fafafa',
  color: '#bdbdbd',
  transition: 'border .3s ease-in-out'
};

const activeStyle = {
  borderColor: '#2196f3'
};

const acceptStyle = {
  borderColor: '#00e676'
};

const rejectStyle = {
  borderColor: '#ff1744'
};

function DropzoneComponent({
  files,
  setFiles,
  icon = true,
  title = ""
} : {
  files: any,
  setFiles: Dispatch<SetStateAction<never[]>>,
  icon?: boolean,
  title?: string,
}) {
  const onDrop = useCallback((acceptedFiles: any) => {
    setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
      preview: URL.createObjectURL(file)
    })));
  // eslint-disable-next-line
  }, []);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      text: ['.xlsx', '.xls', '.csv']
    }
  });

  const style = useMemo(() => ({
    ...baseStyle,
    ...(isDragActive ? activeStyle : {}),
    ...(isDragAccept ? acceptStyle : {}),
    ...(isDragReject ? rejectStyle : {})
  }), [
    isDragActive,
    isDragReject,
    isDragAccept
  ]);

  const thumbs = files.map((file: any, index: number) => (
    <List
      key={index}
      sx={{ width: '100%', maxWidth: 360, bgcolor: 'white' }}
    >
      <ListItem
        secondaryAction={
          <Stack direction="row">
            <IconButton
              aria-label="comment"
              onClick={() => setFiles([])}
            >
              <VisibilityIcon />
            <IconButton
              aria-label="comment"
              onClick={() => setFiles([])}
            >
              <DeleteIcon />
            </IconButton>
            </IconButton>

          </Stack>
        }
      >
        <ListItemIcon>
          <InsertDriveFileIcon />
        </ListItemIcon>
        <ListItemText id="switch-list-label-wifi" primary={file.name} secondary={title} />
      </ListItem>
    </List>
  ));



  // clean up
  useEffect(() => () => {
    files.forEach((file: any) => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <section>
      {
        files.length > 0 ? (
          <aside>
            {thumbs}
          </aside>
        ) : (
          <Box sx={{...style}} {...getRootProps()}>
            <input {...getInputProps()} />
            {icon ? (
              <>
                <CloudUploadIcon
                  sx={{
                    fontSize: '100px'
                  }}
                />
                <Typography align='center'>Drag and drop files<br/>or<br/>Select files</Typography>
              </>
            ) : (
              <Stack
                direction="row"
                justifyContent="space-between"
                sx={{width: '100%'}}
              >
                <Typography sx={{p: 2}}>
                  {title}
                </Typography>
                <Typography sx={{p: 2}} align='center'>Drag and drop files</Typography>
                <CloudUploadIcon
                  sx={{
                    fontSize: '20px',
                    p: 2
                  }}
                />
              </Stack>
            )}
          </Box>
        )
      }
    </section>
  )
}

export default DropzoneComponent;