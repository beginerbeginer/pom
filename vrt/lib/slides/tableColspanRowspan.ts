import { palette } from "./palette.js";

// ============================================================
// Page 23: Table Colspan/Rowspan Test
// テスト対象: colspan, rowspan
// ============================================================
export const page23TableColspanRowspanXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 23: Table Colspan/Rowspan Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">colspan (3-column merge header):</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}" colspan="3" textAlign="center">Merged Header</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">A</TableCell>
          <TableCell fontSize="13">B</TableCell>
          <TableCell fontSize="13">C</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">D</TableCell>
          <TableCell fontSize="13">E</TableCell>
          <TableCell fontSize="13">F</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">rowspan (2-row merge):</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontSize="13" bold="true" backgroundColor="${palette.lightBlue}" rowspan="2">Row Merge</TableCell>
          <TableCell fontSize="13">A</TableCell>
          <TableCell fontSize="13">B</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">C</TableCell>
          <TableCell fontSize="13">D</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">E</TableCell>
          <TableCell fontSize="13">F</TableCell>
          <TableCell fontSize="13">G</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">colspan + rowspan combined:</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontSize="14" bold="true" backgroundColor="${palette.navy}" color="FFFFFF" colspan="2" rowspan="2" textAlign="center">2x2 Merge</TableCell>
          <TableCell fontSize="13" backgroundColor="${palette.lightBlue}">Top</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13" backgroundColor="${palette.lightBlue}">Mid</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">X</TableCell>
          <TableCell fontSize="13">Y</TableCell>
          <TableCell fontSize="13">Z</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
</VStack>
`;
