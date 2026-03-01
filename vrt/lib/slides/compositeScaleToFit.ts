import { palette } from "./palette.js";

// ============================================================
// Page 22: Composite Node Scale to Fit Test
// テスト対象: コンポジットノードが親コンテナからはみ出す場合の等比縮小
// ============================================================
export const page22CompositeScaleToFitXml = `
<VStack w="100%" h="max" padding="48" gap="12" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 22: Composite Scale to Fit</Text>
  <HStack gap="12" alignItems="stretch">
    <Box w="33%" padding="8" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="4">
        <Text fontPx="10" bold="true">Tree (shrunk in container):</Text>
        <Tree layout="vertical" nodeShape="roundRect">
          <TreeItem label="CEO" color="1D4ED8">
            <TreeItem label="CTO" color="0EA5E9">
              <TreeItem label="Eng A" />
              <TreeItem label="Eng B" />
            </TreeItem>
            <TreeItem label="CFO" color="16A34A">
              <TreeItem label="Acct" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </VStack>
    </Box>
    <Box w="33%" padding="8" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="4">
        <Text fontPx="10" bold="true">ProcessArrow (shrunk in container):</Text>
        <ProcessArrow direction="horizontal">
          <ProcessArrowStep label="Plan" color="#4472C4" />
          <ProcessArrowStep label="Design" color="#5B9BD5" />
          <ProcessArrowStep label="Dev" color="#70AD47" />
          <ProcessArrowStep label="Test" color="#FFC000" />
          <ProcessArrowStep label="Ship" color="#ED7D31" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box w="34%" padding="8" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="4">
        <Text fontPx="10" bold="true">Timeline (shrunk in container):</Text>
        <Timeline direction="horizontal">
          <TimelineItem date="Q1" title="Alpha" color="4CAF50" />
          <TimelineItem date="Q2" title="Beta" color="2196F3" />
          <TimelineItem date="Q3" title="GA" color="E91E63" />
          <TimelineItem date="Q4" title="v2" color="FF9800" />
        </Timeline>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="12" alignItems="stretch">
    <Box w="25%" padding="8" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="4">
        <Text fontPx="10" bold="true">Matrix (shrunk):</Text>
        <Matrix>
          <MatrixAxes x="Impact" y="Effort" />
          <MatrixItem label="A" x="0.2" y="0.8" color="4CAF50" />
          <MatrixItem label="B" x="0.7" y="0.3" color="E91E63" />
        </Matrix>
      </VStack>
    </Box>
    <Box w="40%" padding="8" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="4">
        <Text fontPx="10" bold="true">Flow (shrunk in container):</Text>
        <Flow direction="horizontal">
          <FlowNode id="s" shape="flowChartTerminator" text="Start" />
          <FlowNode id="p" shape="flowChartProcess" text="Process" />
          <FlowNode id="d" shape="flowChartDecision" text="OK?" />
          <FlowNode id="e" shape="flowChartTerminator" text="End" />
          <FlowConnection from="s" to="p" />
          <FlowConnection from="p" to="d" />
          <FlowConnection from="d" to="e" />
        </Flow>
      </VStack>
    </Box>
    <Box w="35%" padding="8" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="4">
        <Text fontPx="10" bold="true">Tree (explicit w/h, no shrink):</Text>
        <Tree layout="vertical" nodeShape="roundRect" w="380" h="200">
          <TreeItem label="Root" color="1D4ED8">
            <TreeItem label="A" />
            <TreeItem label="B" />
          </TreeItem>
        </Tree>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;
