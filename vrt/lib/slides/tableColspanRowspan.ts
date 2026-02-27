import { palette } from "./palette";

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
        <Column width="100" />
        <Column width="100" />
        <Column width="100" />
        <Row>
          <Cell fontPx="14" bold="true" backgroundColor="${palette.lightBlue}" colspan="3" alignText="center">Merged Header</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">A</Cell>
          <Cell fontPx="13">B</Cell>
          <Cell fontPx="13">C</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">D</Cell>
          <Cell fontPx="13">E</Cell>
          <Cell fontPx="13">F</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">rowspan (2-row merge):</Text>
      <Table defaultRowHeight="32">
        <Column width="100" />
        <Column width="100" />
        <Column width="100" />
        <Row>
          <Cell fontPx="13" bold="true" backgroundColor="${palette.lightBlue}" rowspan="2">Row Merge</Cell>
          <Cell fontPx="13">A</Cell>
          <Cell fontPx="13">B</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">C</Cell>
          <Cell fontPx="13">D</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">E</Cell>
          <Cell fontPx="13">F</Cell>
          <Cell fontPx="13">G</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">colspan + rowspan combined:</Text>
      <Table defaultRowHeight="32">
        <Column width="100" />
        <Column width="100" />
        <Column width="100" />
        <Row>
          <Cell fontPx="14" bold="true" backgroundColor="${palette.navy}" color="FFFFFF" colspan="2" rowspan="2" alignText="center">2x2 Merge</Cell>
          <Cell fontPx="13" backgroundColor="${palette.lightBlue}">Top</Cell>
        </Row>
        <Row>
          <Cell fontPx="13" backgroundColor="${palette.lightBlue}">Mid</Cell>
        </Row>
        <Row>
          <Cell fontPx="13">X</Cell>
          <Cell fontPx="13">Y</Cell>
          <Cell fontPx="13">Z</Cell>
        </Row>
      </Table>
    </VStack>
  </Box>
</VStack>
`;
