import { Box, Button, Card, CardActions, CardContent, Divider, Grid, Typography } from "@mui/material";
import { DataGrid, GridToolbarContainer, GridToolbarExport, gridColumnVisibilityModelSelector } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { getEntryData } from "../../handlers/admin/entryData";
import { matchRoutes, useLoaderData } from "react-router-dom";

export const Component = () => {
  const campus = useOutletContext();
  const loaderData = useLoaderData();
  const [entryData, setEntryData] = useState([{}]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    // { field: 'lrn', headerName: 'LRN', width: 90 },
    {
      field: 'givenName',
      headerName: 'Given name',
      width: 150,
      // editable: true,
    },
    {
      field: 'lastName',
      headerName: 'Last name',
      width: 150,
      // editable: true,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 150,
      // editable: true,
    },
    {
      field: 'slotID',
      headerName: 'Slot ID',
      width: 150,
      // editable: true,
    },
    {
      field: 'program',
      headerName: 'Program',
      width: 150,
      // editable: true,
    },
    {
      field: 'examCenter',
      headerName: 'Exam Center',
      width: 150,
      // editable: true,
    },
    {
      field: 'dateOfExam',
      headerName: 'Exam Date',
      width: 150,
      // editable: true,
    },
    // {
    //   field: 'age',
    //   headerName: 'Age',
    //   type: 'number',
    //   width: 110,
    //   editable: true,
    // },
    // {
    //   field: 'fullName',
    //   headerName: 'Full name',
    //   description: 'This column has a value getter and is not sortable.',
    //   sortable: false,
    //   width: 160,
    //   valueGetter: (params) =>
    //     `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    // },
  ];
  // const getRowId = (row) => row.id;
  const rows = [
    { id: 1, lastName: 'Snow', givenName: 'Jon' },
    { id: 2, lastName: 'Lannister', givenName: 'Cersei' },
    { id: 3, lastName: 'Lannister', givenName: 'Jaime' },
    { id: 4, lastName: 'Stark', givenName: 'Arya' },
    { id: 5, lastName: 'Targaryen', givenName: 'Daenerys' },
    { id: 6, lastName: 'Melisandre', givenName: null },
    { id: 7, lastName: 'Clifford', givenName: 'Ferrara' },
    { id: 8, lastName: 'Frances', givenName: 'Rossini' },
    { id: 9, lastName: 'Roxie', givenName: 'Harvey' },
  ];
  useEffect(() => {
      if(loaderData.msg !== 'no data'){
        const data = loaderData.data.map(({LRN, givenName, middleName, lastName, email, slotID, program, examCenter, dateOfExam}, index) => {
          console.log(index);
          return {
                    // id:index, 
                    givenName, 
                    middleName, 
                    lastName, 
                    email, 
                    slotID, 
                    program, 
                    examCenter, 
                    dateOfExam,
                  }
                });
                // setEntryData(data);
                setEntryData(data);
        // console.log('====================================');
        // console.log('====================================');
      } else {
        console.log(loaderData.msg);
      }
  },[loaderData])
  const getRowId = (row) => row.id ;
  return (
    <>
      <Box>
        <Card sx={{ maxHeight: "300px", maxWidth: "300px" }} >
        </Card>
        <Card sx={{ width: '100%' }}>
          <Box
            display="flex"
            justifyContent="space-between"
            paddingX={2}
          >
            <Typography>{`${campus} Campus`}</Typography>
            <Divider />
            <Typography>{`Logout`}</Typography>
          </Box>
          <CardContent>
            <DataGrid
              rows={entryData}
              columns={columns}
              // getRowId={getRowId}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 5,
                  },
                },
                columns: {
                  columnVisibilityModel: {
                    // Hide column id
                    id: false,
                  }
                }
              }}
              pageSizeOptions={[5]}
              checkboxSelection
              disableRowSelectionOnClick
              // {...rows} 
              // loading={<h1>Loading...</h1>} 
              slots={{ toolbar:  
                CustomToolbar
              }}
            />
          </CardContent>
          {/* <CardActions>
            <Button sx={{ color: "red" }}>Cancel Reservation</Button>
          </CardActions> */}
        </Card>
      </Box>
    </>
  );
};

export const CustomToolbar = () => {
  return(
    <>
      <GridToolbarContainer>
        <GridToolbarExport />
      </GridToolbarContainer> 
    </>
  )
}

export const loader = async () => {
  return await getEntryData();
}
