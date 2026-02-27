import { palette } from "./palette";

// ============================================================
// Page 4: Table Test
// テスト対象: columns, rows, defaultRowHeight, セルプロパティ
// ============================================================
export const page4TableXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 4: Table Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Basic table (header + data rows):</Text>
      <Table defaultRowHeight="32">
        <Column width="100" />
        <Column width="200" />
        <Column width="100" />
        <Row>
          <Cell fontPx="14" bold="true" backgroundColor="${palette.lightBlue}">ID</Cell>
          <Cell fontPx="14" bold="true" backgroundColor="${palette.lightBlue}">Name</Cell>
          <Cell fontPx="14" bold="true" backgroundColor="${palette.lightBlue}">Status</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">001</Cell>
          <Cell fontPx="13">Item Alpha</Cell>
          <Cell fontPx="13">Active</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">002</Cell>
          <Cell fontPx="13">Item Beta</Cell>
          <Cell fontPx="13">Pending</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">003</Cell>
          <Cell fontPx="13">Item Gamma</Cell>
          <Cell fontPx="13">Done</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Cell alignText (left / center / right):</Text>
      <Table defaultRowHeight="32">
        <Column width="150" />
        <Column width="150" />
        <Column width="150" />
        <Row>
          <Cell fontPx="13" alignText="left" backgroundColor="${palette.lightBlue}">Left</Cell>
          <Cell fontPx="13" alignText="center" backgroundColor="${palette.lightBlue}">Center</Cell>
          <Cell fontPx="13" alignText="right" backgroundColor="${palette.lightBlue}">Right</Cell>
        </Row>
        <Row>
          <Cell fontPx="13" alignText="left">Aligned left</Cell>
          <Cell fontPx="13" alignText="center">Aligned center</Cell>
          <Cell fontPx="13" alignText="right">Aligned right</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Cell backgroundColor &amp; color:</Text>
      <Table defaultRowHeight="32">
        <Column width="150" />
        <Column width="150" />
        <Column width="150" />
        <Row>
          <Cell fontPx="13" backgroundColor="${palette.lightBlue}">Light Blue BG</Cell>
          <Cell fontPx="13" backgroundColor="${palette.navy}" color="FFFFFF">Navy BG + White</Cell>
          <Cell fontPx="13" color="${palette.blue}">Blue text</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Column width omitted (auto equal split):</Text>
      <Table w="450" defaultRowHeight="32">
        <Column />
        <Column />
        <Column />
        <Row>
          <Cell fontPx="13" backgroundColor="${palette.lightBlue}" bold="true">Col 1</Cell>
          <Cell fontPx="13" backgroundColor="${palette.lightBlue}" bold="true">Col 2</Cell>
          <Cell fontPx="13" backgroundColor="${palette.lightBlue}" bold="true">Col 3</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">150px each</Cell>
          <Cell fontPx="13">150px each</Cell>
          <Cell fontPx="13">150px each</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
</VStack>
`;
