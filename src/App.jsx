import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_ShowHideColumnsButton,
  MRT_ToggleFullScreenButton,
  MRT_TableHeadCellFilterContainer,
  useMaterialReactTable,
} from 'material-react-table';
import FilterIcon from '@mui/icons-material/FilterAlt';
import CloseButton from '@mui/icons-material/Close'
import { data } from './data';
import {
  Stack,
  Box,
  Paper,
  useMediaQuery
} from '@mui/material';
import moment from 'moment';

const App = () => {
  const isMobile = useMediaQuery('(max-width: 1000px)');

  const columns = useMemo(
    //column definitions...
    () => [
      {
        header: 'id',
        accessorKey: 'id',
      },
      {
        header: 'Name',
        accessorKey: 'name',
      },
      {
        header: 'Category',
        accessorKey: 'category',
      },
      {
        header: 'Subcategory',
        accessorKey: 'subcategory',
      },
      {
        header: 'created At',
        accessorKey: 'createdAt',
        filterVariant: 'date-range',
        accessorFn: (item) => moment(item.createdAt).format('DD-MMM-YY'),
      },
      {
        header: 'Updated At',
        accessorKey: 'updatedAt',
        accessorFn: (item) => moment(item.updatedAt).format('DD-MMM-YY'),
      },
      {
        header: 'Price',
        accessorKey: 'price',
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive',
      },
      {
        header: 'Sale Price',
        accessorKey: 'sale_price',
        filterVariant: 'range-slider',
        filterFn: 'betweenInclusive',
      },
    ],
    [],
    //end
  );

  //demo state
  const [groupedColumnMode, setGroupedColumnMode] = useState('reorder'); //default is 'reorder

  const table = useMaterialReactTable({
    columns,
    data,
    columnFilterDisplayMode: 'custom', 
    enableFacetedValues: true,
    renderToolbarInternalActions: ({ table }) => (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <FilterIcon onClick={() => filterhandler()} />
        <MRT_ShowHideColumnsButton table={table} />
        <MRT_ToggleFullScreenButton table={table} />
      </Box>
    ),
    muiFilterTextFieldProps: ({ column }) => ({
      label: `Filter by ${column.columnDef.header}`,
    }),
    enableGrouping: true,
    groupedColumnMode,
    positionGlobalFilter: 'left',
    initialState: {
      expanded: false, //expand all groups by default
      grouping: [], //an array of columns to group by by default (can be multiple)
      pagination: { pageIndex: 0, pageSize: 10 },
      showGlobalFilter: true
    },
    muiTableContainerProps: { sx: { maxHeight: '600px', maxWidth: '95vw', margin: '20px', textAlign: 'center', overflow: 'hidden' } },
    muiTableBodyCellProps: {
      //simple styling with the `sx` prop, works just like a style prop in this example
      sx: {
        textAlign: 'center'
      },
    },
    muiTableHeadCellProps: {
      sx: {
        justifyContent: 'center'
      }
    }
  });

  // var element = document.querySelector('[aria-label="Show/Hide filters"]');
  const [clicked, setClicked] = useState(false);

  function filterhandler() {
    document.getElementById('filterBox').style.display = 'block'
    document.getElementById('close').style.display = 'block'

    setClicked(true);
    return;
  }
  function handleClose() {
    document.getElementById('close').style.display = 'none'
    document.getElementById('filterBox').style.display = 'none'

    setClicked(false)
    return;
  }
  // element.
  return (
    <>
      <Stack direction={isMobile ? 'column-reverse' : 'row'} gap="1px">
        <MaterialReactTable sx={{ width: '200px' }} table={table} />

        <Paper id="filterBox" p="1px" gap="1px" sx={{ position: 'absolute', right: '5px', zIndex: '1', background: 'white', padding: '20px', boxShadow: 'rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;', borderRadius: '10px', display: 'none' }}>
          <CloseButton id="close" sx={{ display: 'none', cursor: 'pointer' }} onClick={() => handleClose()} />

          {table.getLeafHeaders().map((header) => (
            <MRT_TableHeadCellFilterContainer
              key={header.id}
              header={header}
              table={table}
              in={clicked}
            />
          ))}
        </Paper>
      </Stack>
    </>
  );
};

export default App;

//demo...

//end
