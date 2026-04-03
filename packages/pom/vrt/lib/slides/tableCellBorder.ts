import { palette } from "./palette.js";

// ============================================================
// Page 37: Table cellBorder Test
// テスト対象: cellBorder (色・幅・dashType)
// ============================================================
export const page37TableCellBorderXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 37: Table cellBorder Test</Text>
  <VStack padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
    <Text fontSize="14" bold="true">cellBorder with default style:</Text>
    <Table defaultRowHeight="32" cellBorder='{"color":"${palette.navy}","width":1}'>
      <TableColumn width="150" />
      <TableColumn width="150" />
      <TableColumn width="150" />
      <TableRow>
        <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}">Header 1</TableCell>
        <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}">Header 2</TableCell>
        <TableCell fontSize="14" bold="true" backgroundColor="${palette.lightBlue}">Header 3</TableCell>
      </TableRow>
      <TableRow>
        <TableCell fontSize="13">Cell A</TableCell>
        <TableCell fontSize="13">Cell B</TableCell>
        <TableCell fontSize="13">Cell C</TableCell>
      </TableRow>
      <TableRow>
        <TableCell fontSize="13">Cell D</TableCell>
        <TableCell fontSize="13">Cell E</TableCell>
        <TableCell fontSize="13">Cell F</TableCell>
      </TableRow>
    </Table>
  </VStack>
  <VStack padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
    <Text fontSize="14" bold="true">cellBorder with dashType:</Text>
    <Table defaultRowHeight="32" cellBorder='{"color":"${palette.blue}","width":2,"dashType":"dash"}'>
      <TableColumn width="150" />
      <TableColumn width="150" />
      <TableRow>
        <TableCell fontSize="13">Dashed</TableCell>
        <TableCell fontSize="13">Border</TableCell>
      </TableRow>
      <TableRow>
        <TableCell fontSize="13">Style</TableCell>
        <TableCell fontSize="13">Test</TableCell>
      </TableRow>
    </Table>
  </VStack>
  <VStack padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' gap="12">
    <Text fontSize="14" bold="true">Table without cellBorder (default = no border):</Text>
    <Table defaultRowHeight="32">
      <TableColumn width="150" />
      <TableColumn width="150" />
      <TableRow>
        <TableCell fontSize="13" backgroundColor="${palette.lightBlue}">No</TableCell>
        <TableCell fontSize="13" backgroundColor="${palette.lightBlue}">Border</TableCell>
      </TableRow>
      <TableRow>
        <TableCell fontSize="13">Default</TableCell>
        <TableCell fontSize="13">Behavior</TableCell>
      </TableRow>
    </Table>
  </VStack>
</VStack>
`;
