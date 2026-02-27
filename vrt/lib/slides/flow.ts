import { palette } from "./palette";

// ============================================================
// Page 13: Flow Node Test
// テスト対象: FlowNode - direction, nodes, connections, connectorStyle
// ============================================================
export const page13FlowXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 13: Flow Node Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Horizontal Flow (Basic Process):</Text>
        <Flow direction="horizontal" w="550" h="150">
          <FlowNode id="start" shape="flowChartTerminator" text="開始" />
          <FlowNode id="process1" shape="flowChartProcess" text="処理A" />
          <FlowNode id="process2" shape="flowChartProcess" text="処理B" />
          <FlowNode id="end" shape="flowChartTerminator" text="終了" />
          <Connection from="start" to="process1" />
          <Connection from="process1" to="process2" />
          <Connection from="process2" to="end" />
        </Flow>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Vertical Flow (Simple):</Text>
        <Flow direction="vertical" w="550" h="300" connectorStyle='{"color":"333333","width":2}'>
          <FlowNode id="start" shape="flowChartTerminator" text="開始" color="4CAF50" />
          <FlowNode id="input" shape="flowChartInputOutput" text="データ入力" />
          <FlowNode id="process" shape="flowChartProcess" text="処理" />
          <FlowNode id="end" shape="flowChartTerminator" text="終了" color="E91E63" />
          <Connection from="start" to="input" />
          <Connection from="input" to="process" />
          <Connection from="process" to="end" />
        </Flow>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Flow with Decision:</Text>
        <Flow direction="horizontal" w="550" h="150">
          <FlowNode id="start" shape="flowChartTerminator" text="開始" />
          <FlowNode id="decision" shape="flowChartDecision" text="条件?" color="FF9800" />
          <FlowNode id="yes" shape="flowChartProcess" text="Yes処理" color="4CAF50" />
          <FlowNode id="end" shape="flowChartTerminator" text="終了" />
          <Connection from="start" to="decision" />
          <Connection from="decision" to="yes" label="Yes" />
          <Connection from="yes" to="end" />
        </Flow>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Custom Node Colors:</Text>
        <Flow direction="horizontal" w="550" h="150" connectorStyle='{"color":"64748B","width":2,"arrowType":"arrow"}'>
          <FlowNode id="doc" shape="flowChartDocument" text="ドキュメント" color="2196F3" />
          <FlowNode id="db" shape="flowChartMagneticDisk" text="DB" color="9C27B0" />
          <FlowNode id="prep" shape="flowChartPreparation" text="準備" color="009688" />
          <Connection from="doc" to="db" />
          <Connection from="db" to="prep" />
        </Flow>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;
