import { palette } from "./palette.js";

// ============================================================
// Page 4: Table Test
// テスト対象: columns, rows, defaultRowHeight, セルプロパティ
// ============================================================
export const page4TableXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 4: Table Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Basic table (header + data rows):</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="100" />
        <TableColumn width="200" />
        <TableColumn width="100" />
        <TableRow>
          <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}">ID</TableCell>
          <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}">Name</TableCell>
          <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}">Status</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">001</TableCell>
          <TableCell fontSize="13">Item Alpha</TableCell>
          <TableCell fontSize="13">Active</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">002</TableCell>
          <TableCell fontSize="13">Item Beta</TableCell>
          <TableCell fontSize="13">Pending</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">003</TableCell>
          <TableCell fontSize="13">Item Gamma</TableCell>
          <TableCell fontSize="13">Done</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Cell textAlign (left / center / right):</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="150" />
        <TableColumn width="150" />
        <TableColumn width="150" />
        <TableRow>
          <TableCell fontSize="13" textAlign="left" backgroundColor="${palette.lightBlue}">Left</TableCell>
          <TableCell fontSize="13" textAlign="center" backgroundColor="${palette.lightBlue}">Center</TableCell>
          <TableCell fontSize="13" textAlign="right" backgroundColor="${palette.lightBlue}">Right</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13" textAlign="left">Aligned left</TableCell>
          <TableCell fontSize="13" textAlign="center">Aligned center</TableCell>
          <TableCell fontSize="13" textAlign="right">Aligned right</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Cell backgroundColor &amp; color:</Text>
      <Table defaultRowHeight="32">
        <TableColumn width="150" />
        <TableColumn width="150" />
        <TableColumn width="150" />
        <TableRow>
          <TableCell fontSize="13" backgroundColor="${palette.lightBlue}">Light Blue BG</TableCell>
          <TableCell fontSize="13" backgroundColor="${palette.navy}" color="FFFFFF">Navy BG + White</TableCell>
          <TableCell fontSize="13" color="${palette.blue}">Blue text</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontSize="14" bold="true">Column width omitted (auto equal split):</Text>
      <Table w="450" defaultRowHeight="32">
        <TableColumn />
        <TableColumn />
        <TableColumn />
        <TableRow>
          <TableCell fontSize="13" backgroundColor="${palette.lightBlue}" bold="true">Col 1</TableCell>
          <TableCell fontSize="13" backgroundColor="${palette.lightBlue}" bold="true">Col 2</TableCell>
          <TableCell fontSize="13" backgroundColor="${palette.lightBlue}" bold="true">Col 3</TableCell>
        </TableRow>
        <TableRow>
          <TableCell fontSize="13">150px each</TableCell>
          <TableCell fontSize="13">150px each</TableCell>
          <TableCell fontSize="13">150px each</TableCell>
        </TableRow>
      </Table>
    </VStack>
  </Box>
</VStack>
`;
