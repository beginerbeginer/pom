import type { NodeType } from "./config.js";

const palette = {
  background: "F8FAFC",
  navy: "0F172A",
  blue: "1D4ED8",
  lightBlue: "DBEAFE",
  accent: "0EA5E9",
  border: "E2E8F0",
  charcoal: "1E293B",
  red: "DC2626",
  green: "16A34A",
};

const textSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Text Node Example</Text>
  <HStack gap="40">
    <VStack gap="8">
      <Text fontSize="14" bold="true">Font Sizes</Text>
      <Text fontSize="12">12px text</Text>
      <Text fontSize="18">18px text</Text>
      <Text fontSize="24">24px text</Text>
    </VStack>
    <VStack gap="8">
      <Text fontSize="14" bold="true">Colors</Text>
      <Text color="${palette.navy}">Navy color</Text>
      <Text color="${palette.blue}">Blue color</Text>
      <Text color="${palette.red}">Red color</Text>
    </VStack>
    <VStack gap="8">
      <Text fontSize="14" bold="true">Alignment</Text>
      <Text textAlign="left" w="150" backgroundColor="${palette.lightBlue}">Left aligned</Text>
      <Text textAlign="center" w="150" backgroundColor="${palette.lightBlue}">Center aligned</Text>
      <Text textAlign="right" w="150" backgroundColor="${palette.lightBlue}">Right aligned</Text>
    </VStack>
    <VStack gap="8">
      <Text fontSize="14" bold="true">Inline Formatting</Text>
      <Text>Normal <B>bold</B> text</Text>
      <Text>Normal <I>italic</I> text</Text>
      <Text><B><I>Bold italic</I></B></Text>
    </VStack>
  </HStack>
</VStack>
`;

const sampleImageUrl = "sample_images/sample_0.png";

const imageSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Image Node Example</Text>
  <HStack gap="40" alignItems="center">
    <Image src="${sampleImageUrl}" w="200" h="150" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16" />
    <Image src="${sampleImageUrl}" w="150" h="150" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" borderRadius="8" padding="16" />
    <Image src="${sampleImageUrl}" w="180" h="120" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" borderRadius="16" padding="16" />
  </HStack>
</VStack>
`;

const tableSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Table Node Example</Text>
  <Table defaultRowHeight="36">
    <Col width="80" />
    <Col width="200" />
    <Col width="100" />
    <Col width="120" />
    <Tr>
      <Td bold="true" backgroundColor="${palette.navy}" color="FFFFFF" textAlign="center">ID</Td>
      <Td bold="true" backgroundColor="${palette.navy}" color="FFFFFF" textAlign="center">Name</Td>
      <Td bold="true" backgroundColor="${palette.navy}" color="FFFFFF" textAlign="center">Status</Td>
      <Td bold="true" backgroundColor="${palette.navy}" color="FFFFFF" textAlign="center">Progress</Td>
    </Tr>
    <Tr>
      <Td textAlign="center">001</Td>
      <Td>Project Alpha</Td>
      <Td color="${palette.green}">Active</Td>
      <Td textAlign="right">75%</Td>
    </Tr>
    <Tr>
      <Td textAlign="center">002</Td>
      <Td>Project Beta</Td>
      <Td color="${palette.accent}">Pending</Td>
      <Td textAlign="right">30%</Td>
    </Tr>
    <Tr>
      <Td textAlign="center">003</Td>
      <Td>Project Gamma</Td>
      <Td color="${palette.blue}">Complete</Td>
      <Td textAlign="right">100%</Td>
    </Tr>
  </Table>
</VStack>
`;

const shapeSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Shape Node Example</Text>
  <HStack gap="32" alignItems="center">
    <Shape shapeType="rect" w="120" h="80" fill.color="${palette.blue}" text="Rectangle" color="FFFFFF" fontSize="14" textAlign="center" />
    <Shape shapeType="roundRect" w="120" h="80" fill.color="${palette.green}" text="Rounded" color="FFFFFF" fontSize="14" textAlign="center" />
    <Shape shapeType="ellipse" w="100" h="100" fill.color="${palette.accent}" text="Ellipse" color="FFFFFF" fontSize="14" textAlign="center" />
    <Shape shapeType="diamond" w="100" h="100" fill.color="${palette.red}" text="Diamond" color="FFFFFF" fontSize="12" textAlign="center" />
    <Shape shapeType="rightArrow" w="140" h="60" fill.color="${palette.navy}" text="Arrow" color="FFFFFF" fontSize="14" textAlign="center" />
  </HStack>
</VStack>
`;

const chartSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Chart Node Example</Text>
  <HStack gap="32">
    <Chart chartType="bar" w="350" h="250" showTitle="true" title="Bar Chart" showLegend="true" chartColors='["${palette.blue}","${palette.green}","${palette.red}"]'>
      <ChartSeries name="Q1">
        <ChartDataPoint label="Jan" value="30" />
        <ChartDataPoint label="Feb" value="45" />
        <ChartDataPoint label="Mar" value="60" />
      </ChartSeries>
      <ChartSeries name="Q2">
        <ChartDataPoint label="Jan" value="40" />
        <ChartDataPoint label="Feb" value="55" />
        <ChartDataPoint label="Mar" value="70" />
      </ChartSeries>
    </Chart>
    <Chart chartType="pie" w="300" h="250" showTitle="true" title="Pie Chart" showLegend="true" chartColors='["${palette.blue}","${palette.green}","${palette.accent}","${palette.red}"]'>
      <ChartSeries>
        <ChartDataPoint label="Category A" value="35" />
        <ChartDataPoint label="Category B" value="25" />
        <ChartDataPoint label="Category C" value="25" />
        <ChartDataPoint label="Category D" value="15" />
      </ChartSeries>
    </Chart>
    <Chart chartType="line" w="350" h="250" showTitle="true" title="Line Chart" showLegend="true" chartColors='["${palette.blue}","${palette.red}"]'>
      <ChartSeries name="2023">
        <ChartDataPoint label="Q1" value="20" />
        <ChartDataPoint label="Q2" value="35" />
        <ChartDataPoint label="Q3" value="45" />
        <ChartDataPoint label="Q4" value="60" />
      </ChartSeries>
      <ChartSeries name="2024">
        <ChartDataPoint label="Q1" value="30" />
        <ChartDataPoint label="Q2" value="50" />
        <ChartDataPoint label="Q3" value="55" />
        <ChartDataPoint label="Q4" value="75" />
      </ChartSeries>
    </Chart>
  </HStack>
</VStack>
`;

const timelineSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Timeline Node Example</Text>
  <Timeline direction="horizontal" w="100%" h="200">
    <TimelineItem date="2024 Q1" title="Phase 1" description="Planning &amp; Research" color="${palette.blue}" />
    <TimelineItem date="2024 Q2" title="Phase 2" description="Development" color="${palette.green}" />
    <TimelineItem date="2024 Q3" title="Phase 3" description="Testing" color="${palette.accent}" />
    <TimelineItem date="2024 Q4" title="Phase 4" description="Launch" color="${palette.red}" />
  </Timeline>
</VStack>
`;

const matrixSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Matrix Node Example</Text>
  <Matrix w="500" h="400">
    <MatrixAxes x="Cost" y="Impact" />
    <MatrixQuadrants topLeft="Low Cost\nHigh Impact" topRight="High Cost\nHigh Impact" bottomLeft="Low Cost\nLow Impact" bottomRight="High Cost\nLow Impact" />
    <MatrixItem label="Project A" x="0.2" y="0.8" color="${palette.green}" />
    <MatrixItem label="Project B" x="0.7" y="0.85" color="${palette.blue}" />
    <MatrixItem label="Project C" x="0.3" y="0.3" color="${palette.accent}" />
    <MatrixItem label="Project D" x="0.8" y="0.2" color="${palette.red}" />
  </Matrix>
</VStack>
`;

const treeSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Tree Node Example</Text>
  <Tree layout="vertical" nodeShape="roundRect" w="100%" h="400" connectorStyle.color="${palette.charcoal}" connectorStyle.width="2">
    <TreeItem label="CEO" color="${palette.navy}">
      <TreeItem label="CTO" color="${palette.blue}">
        <TreeItem label="Dev Team" color="${palette.accent}" />
        <TreeItem label="QA Team" color="${palette.accent}" />
      </TreeItem>
      <TreeItem label="CFO" color="${palette.green}">
        <TreeItem label="Finance" color="${palette.accent}" />
        <TreeItem label="Accounting" color="${palette.accent}" />
      </TreeItem>
      <TreeItem label="COO" color="${palette.red}">
        <TreeItem label="Operations" color="${palette.accent}" />
        <TreeItem label="HR" color="${palette.accent}" />
      </TreeItem>
    </TreeItem>
  </Tree>
</VStack>
`;

const flowSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Flow Node Example</Text>
  <Flow direction="horizontal" w="100%" h="300" connectorStyle.color="${palette.charcoal}" connectorStyle.width="2">
    <FlowNode id="start" shape="flowChartTerminator" text="Start" color="${palette.green}" />
    <FlowNode id="input" shape="flowChartInputOutput" text="Input Data" color="${palette.lightBlue}" />
    <FlowNode id="process" shape="flowChartProcess" text="Process" color="${palette.blue}" />
    <FlowNode id="decision" shape="flowChartDecision" text="Valid?" color="${palette.accent}" />
    <FlowNode id="end" shape="flowChartTerminator" text="End" color="${palette.red}" />
    <FlowConnection from="start" to="input" />
    <FlowConnection from="input" to="process" />
    <FlowConnection from="process" to="decision" />
    <FlowConnection from="decision" to="end" label="Yes" />
  </Flow>
</VStack>
`;

const processArrowSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">ProcessArrow Node Example</Text>
  <ProcessArrow direction="horizontal" w="100%" h="100">
    <ProcessArrowStep label="Planning" color="4472C4" />
    <ProcessArrowStep label="Design" color="5B9BD5" />
    <ProcessArrowStep label="Development" color="70AD47" />
    <ProcessArrowStep label="Testing" color="FFC000" />
    <ProcessArrowStep label="Release" color="ED7D31" />
  </ProcessArrow>
  <HStack gap="32">
    <VStack gap="8">
      <Text fontSize="14" bold="true">Default Style</Text>
      <ProcessArrow direction="horizontal" w="400" h="60">
        <ProcessArrowStep label="Input" />
        <ProcessArrowStep label="Process" />
        <ProcessArrowStep label="Output" />
      </ProcessArrow>
    </VStack>
    <VStack gap="8">
      <Text fontSize="14" bold="true">Custom Text Color</Text>
      <ProcessArrow direction="horizontal" w="400" h="60">
        <ProcessArrowStep label="Light BG" color="FFEB3B" textColor="333333" />
        <ProcessArrowStep label="Dark BG" color="${palette.navy}" textColor="FFFFFF" />
        <ProcessArrowStep label="Blue BG" color="${palette.blue}" textColor="FFFFFF" />
      </ProcessArrow>
    </VStack>
  </HStack>
</VStack>
`;

const pyramidSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Pyramid Node Example</Text>
  <HStack gap="32">
    <VStack gap="8">
      <Text fontSize="14" bold="true">direction: up (default)</Text>
      <Pyramid direction="up" w="400" h="250">
        <PyramidLevel label="Vision" color="${palette.navy}" />
        <PyramidLevel label="Strategy" color="${palette.blue}" />
        <PyramidLevel label="Tactics" color="${palette.accent}" />
        <PyramidLevel label="Operations" color="${palette.green}" />
      </Pyramid>
    </VStack>
    <VStack gap="8">
      <Text fontSize="14" bold="true">direction: down</Text>
      <Pyramid direction="down" w="400" h="250">
        <PyramidLevel label="Executive" color="${palette.navy}" />
        <PyramidLevel label="Management" color="${palette.blue}" />
        <PyramidLevel label="Team Lead" color="${palette.accent}" />
        <PyramidLevel label="Staff" color="${palette.green}" />
      </Pyramid>
    </VStack>
  </HStack>
</VStack>
`;

const vstackSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">VStack Node Example</Text>
  <HStack gap="32">
    <VStack w="200" h="250" gap="8" alignItems="start" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16">
      <Text fontSize="12" bold="true">alignItems: start</Text>
      <Shape shapeType="rect" w="100" h="40" fill.color="${palette.blue}" />
      <Shape shapeType="rect" w="80" h="40" fill.color="${palette.green}" />
      <Shape shapeType="rect" w="120" h="40" fill.color="${palette.red}" />
    </VStack>
    <VStack w="200" h="250" gap="8" alignItems="center" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16">
      <Text fontSize="12" bold="true">alignItems: center</Text>
      <Shape shapeType="rect" w="100" h="40" fill.color="${palette.blue}" />
      <Shape shapeType="rect" w="80" h="40" fill.color="${palette.green}" />
      <Shape shapeType="rect" w="120" h="40" fill.color="${palette.red}" />
    </VStack>
    <VStack w="200" h="250" gap="8" alignItems="end" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16">
      <Text fontSize="12" bold="true">alignItems: end</Text>
      <Shape shapeType="rect" w="100" h="40" fill.color="${palette.blue}" />
      <Shape shapeType="rect" w="80" h="40" fill.color="${palette.green}" />
      <Shape shapeType="rect" w="120" h="40" fill.color="${palette.red}" />
    </VStack>
  </HStack>
</VStack>
`;

const hstackSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">HStack Node Example</Text>
  <VStack gap="16">
    <HStack w="100%" h="80" gap="16" justifyContent="start" alignItems="center" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16">
      <Text fontSize="12" bold="true" w="150">justifyContent: start</Text>
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.blue}" />
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.green}" />
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.red}" />
    </HStack>
    <HStack w="100%" h="80" gap="16" justifyContent="center" alignItems="center" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16">
      <Text fontSize="12" bold="true" w="150">justifyContent: center</Text>
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.blue}" />
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.green}" />
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.red}" />
    </HStack>
    <HStack w="100%" h="80" gap="16" justifyContent="spaceBetween" alignItems="center" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1" padding="16">
      <Text fontSize="12" bold="true" w="180">justifyContent: spaceBetween</Text>
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.blue}" />
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.green}" />
      <Shape shapeType="rect" w="60" h="40" fill.color="${palette.red}" />
    </HStack>
  </VStack>
</VStack>
`;

const iconSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontSize="28" bold="true" color="${palette.navy}">Icon Node Example</Text>
  <HStack gap="24">
    <VStack gap="16" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <Text fontSize="14" bold="true">Basic Icons</Text>
      <HStack gap="16" alignItems="center">
        <Icon name="cpu" size="32" color="#${palette.blue}" />
        <Icon name="database" size="32" color="#${palette.green}" />
        <Icon name="cloud" size="32" color="#${palette.accent}" />
        <Icon name="server" size="32" color="#${palette.red}" />
        <Icon name="shield" size="32" color="#${palette.navy}" />
      </HStack>
    </VStack>
    <VStack gap="16" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <Text fontSize="14" bold="true">Size Variations</Text>
      <HStack gap="12" alignItems="end">
        <Icon name="star" size="16" color="#${palette.navy}" />
        <Icon name="star" size="24" color="#${palette.navy}" />
        <Icon name="star" size="32" color="#${palette.navy}" />
        <Icon name="star" size="48" color="#${palette.navy}" />
      </HStack>
    </VStack>
    <VStack gap="16" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <Text fontSize="14" bold="true">Color Variations</Text>
      <HStack gap="16" alignItems="center">
        <Icon name="heart" size="32" color="#${palette.navy}" />
        <Icon name="heart" size="32" color="#${palette.blue}" />
        <Icon name="heart" size="32" color="#${palette.red}" />
        <Icon name="heart" size="32" color="#${palette.green}" />
      </HStack>
    </VStack>
  </HStack>
  <HStack gap="24">
    <VStack gap="16" padding="16" backgroundColor="FFFFFF" border.color="${palette.border}" border.width="1">
      <Text fontSize="14" bold="true">Background Variants</Text>
      <HStack gap="16" alignItems="center">
        <Icon name="cpu" size="32" variant="circle-filled" bgColor="#E8F0FE" color="#${palette.blue}" />
        <Icon name="star" size="32" variant="circle-outlined" bgColor="#${palette.blue}" color="#${palette.blue}" />
        <Icon name="settings" size="32" variant="square-filled" bgColor="#E8F0FE" color="#${palette.blue}" />
        <Icon name="lock" size="32" variant="square-outlined" bgColor="#${palette.navy}" color="#${palette.navy}" />
      </HStack>
    </VStack>
  </HStack>
</VStack>
`;

export const sampleNodes: Record<NodeType, string> = {
  text: textSample,
  image: imageSample,
  table: tableSample,
  shape: shapeSample,
  chart: chartSample,
  timeline: timelineSample,
  matrix: matrixSample,
  tree: treeSample,
  flow: flowSample,
  processArrow: processArrowSample,
  pyramid: pyramidSample,
  vstack: vstackSample,
  hstack: hstackSample,
  icon: iconSample,
};
