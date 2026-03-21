import { palette } from "./palette.js";

// ============================================================
// Page 26: Slide Overflow Auto-Fit Test
// テスト対象: コンテンツがスライド縦幅を超えた場合の自動調整
// ============================================================
export const page26OverflowAutoFitXml = `
<VStack w="max" h="max" padding="28" backgroundColor="${palette.background}" gap="18">
  <HStack w="max" alignItems="center" justifyContent="spaceBetween">
    <VStack gap="4">
      <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 26: Overflow Auto-Fit</Text>
      <Text fontSize="13" color="666666">テーブル + テキストが多いスライドの自動調整テスト</Text>
    </VStack>
  </HStack>

  <Box w="max" padding="18" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' borderRadius="8">
    <VStack gap="10">
      <Text fontSize="18" color="${palette.charcoal}" bold="true">概要セクション</Text>
      <Text fontSize="14" color="444444">このスライドは、コンテンツがスライドの縦幅を超えるケースのテストです。テーブルの行数が多いため、通常ははみ出しますが、自動調整によりスライド内に収まります。</Text>
    </VStack>
  </Box>

  <Box w="max" padding="18" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' borderRadius="8">
    <VStack gap="10">
      <Text fontSize="18" color="${palette.charcoal}" bold="true">データテーブル</Text>
      <Table w="max" defaultRowHeight="36">
        <TableColumn />
        <TableColumn />
        <TableColumn />
        <TableColumn />
        <TableRow>
          <TableCell text="項目" bold="true" backgroundColor="${palette.lightBlue}" />
          <TableCell text="Q1" bold="true" backgroundColor="${palette.lightBlue}" />
          <TableCell text="Q2" bold="true" backgroundColor="${palette.lightBlue}" />
          <TableCell text="Q3" bold="true" backgroundColor="${palette.lightBlue}" />
        </TableRow>
        <TableRow>
          <TableCell text="売上高" />
          <TableCell text="1,200万" />
          <TableCell text="1,350万" />
          <TableCell text="1,500万" />
        </TableRow>
        <TableRow>
          <TableCell text="営業利益" />
          <TableCell text="180万" />
          <TableCell text="210万" />
          <TableCell text="250万" />
        </TableRow>
        <TableRow>
          <TableCell text="経常利益" />
          <TableCell text="150万" />
          <TableCell text="180万" />
          <TableCell text="220万" />
        </TableRow>
        <TableRow>
          <TableCell text="純利益" />
          <TableCell text="100万" />
          <TableCell text="130万" />
          <TableCell text="160万" />
        </TableRow>
        <TableRow>
          <TableCell text="従業員数" />
          <TableCell text="45名" />
          <TableCell text="52名" />
          <TableCell text="58名" />
        </TableRow>
        <TableRow>
          <TableCell text="顧客数" />
          <TableCell text="120社" />
          <TableCell text="145社" />
          <TableCell text="170社" />
        </TableRow>
      </Table>
    </VStack>
  </Box>

  <Box w="max" padding="18" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' borderRadius="8">
    <VStack gap="8">
      <Text fontSize="18" color="${palette.charcoal}" bold="true">補足情報</Text>
      <Ul fontSize="13" color="444444">
        <Li text="Q3は過去最高の売上高を達成" />
        <Li text="新規顧客の獲得率が前年比20%増加" />
        <Li text="従業員の生産性が15%向上" />
      </Ul>
    </VStack>
  </Box>
</VStack>
`;
