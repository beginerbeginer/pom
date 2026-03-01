import { palette } from "./palette.js";

// ============================================================
// Page 23: Table Colspan/Rowspan Test
// テスト対象: colspan, rowspan
// ============================================================
export const page23TableColspanRowspanXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 23: Table Colspan/Rowspan Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">colspan (3-column merge header):</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontPx="14" bold="true" backgroundColor="${palette.lightBlue}" colspan="3" alignText="center">Merged Header</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontPx="13">A</TableCell>
          <TableCell fontPx="13">B</TableCell>
          <TableCell fontPx="13">C</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontPx="13">D</TableCell>
          <TableCell fontPx="13">E</TableCell>
          <TableCell fontPx="13">F</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">rowspan (2-row merge):</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontPx="13" bold="true" backgroundColor="${palette.lightBlue}" rowspan="2">Row Merge</TableCell>
          <TableCell fontPx="13">A</TableCell>
          <TableCell fontPx="13">B</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontPx="13">C</TableCell>
          <TableCell fontPx="13">D</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontPx="13">E</TableCell>
          <TableCell fontPx="13">F</TableCell>
          <TableCell fontPx="13">G</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">colspan + rowspan combined:</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontPx="14" bold="true" backgroundColor="${palette.navy}" color="FFFFFF" colspan="2" rowspan="2" alignText="center">2x2 Merge</TableCell>
          <TableCell fontPx="13" backgroundColor="${palette.lightBlue}">Top</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontPx="13" backgroundColor="${palette.lightBlue}">Mid</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontPx="13">X</TableCell>
          <TableCell fontPx="13">Y</TableCell>
          <TableCell fontPx="13">Z</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
</VStack>
`;
