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
  <Text fontPx="28" bold="true" color="${palette.navy}">Text Node Example</Text>
  <HStack gap="40">
    <VStack gap="8">
      <Text fontPx="14" bold="true">Font Sizes</Text>
      <Text fontPx="12">12px text</Text>
      <Text fontPx="18">18px text</Text>
      <Text fontPx="24">24px text</Text>
    </VStack>
    <VStack gap="8">
      <Text fontPx="14" bold="true">Colors</Text>
      <Text color="${palette.navy}">Navy color</Text>
      <Text color="${palette.blue}">Blue color</Text>
      <Text color="${palette.red}">Red color</Text>
    </VStack>
    <VStack gap="8">
      <Text fontPx="14" bold="true">Alignment</Text>
      <Text alignText="left" w="150" backgroundColor="${palette.lightBlue}">Left aligned</Text>
      <Text alignText="center" w="150" backgroundColor="${palette.lightBlue}">Center aligned</Text>
      <Text alignText="right" w="150" backgroundColor="${palette.lightBlue}">Right aligned</Text>
    </VStack>
    <VStack gap="8">
      <Text fontPx="14" bold="true">Bullet List</Text>
      <Text fontPx="14" bullet="true">Item 1\nItem 2\nItem 3</Text>
    </VStack>
  </HStack>
</VStack>
`;

const sampleImageUrl =
  "https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png";

const imageSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Image Node Example</Text>
  <HStack gap="40" alignItems="center">
    <Box backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Image src="${sampleImageUrl}" w="200" h="150" />
    </Box>
    <Box backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' borderRadius="8" padding="16">
      <Image src="${sampleImageUrl}" w="150" h="150" />
    </Box>
    <Box backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' borderRadius="16" padding="16">
      <Image src="${sampleImageUrl}" w="180" h="120" />
    </Box>
  </HStack>
</VStack>
`;

const tableSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Table Node Example</Text>
  <Table defaultRowHeight="36">
    <Column width="80" />
    <Column width="200" />
    <Column width="100" />
    <Column width="120" />
    <Row>
      <Cell bold="true" backgroundColor="${palette.navy}" color="FFFFFF" alignText="center">ID</Cell>
      <Cell bold="true" backgroundColor="${palette.navy}" color="FFFFFF" alignText="center">Name</Cell>
      <Cell bold="true" backgroundColor="${palette.navy}" color="FFFFFF" alignText="center">Status</Cell>
      <Cell bold="true" backgroundColor="${palette.navy}" color="FFFFFF" alignText="center">Progress</Cell>
    </Row>
    <Row>
      <Cell alignText="center">001</Cell>
      <Cell>Project Alpha</Cell>
      <Cell color="${palette.green}">Active</Cell>
      <Cell alignText="right">75%</Cell>
    </Row>
    <Row>
      <Cell alignText="center">002</Cell>
      <Cell>Project Beta</Cell>
      <Cell color="${palette.accent}">Pending</Cell>
      <Cell alignText="right">30%</Cell>
    </Row>
    <Row>
      <Cell alignText="center">003</Cell>
      <Cell>Project Gamma</Cell>
      <Cell color="${palette.blue}">Complete</Cell>
      <Cell alignText="right">100%</Cell>
    </Row>
  </Table>
</VStack>
`;

const shapeSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Shape Node Example</Text>
  <HStack gap="32" alignItems="center">
    <Shape shapeType="rect" w="120" h="80" fill='{"color":"${palette.blue}"}' text="Rectangle" color="FFFFFF" fontPx="14" alignText="center" />
    <Shape shapeType="roundRect" w="120" h="80" fill='{"color":"${palette.green}"}' text="Rounded" color="FFFFFF" fontPx="14" alignText="center" />
    <Shape shapeType="ellipse" w="100" h="100" fill='{"color":"${palette.accent}"}' text="Ellipse" color="FFFFFF" fontPx="14" alignText="center" />
    <Shape shapeType="diamond" w="100" h="100" fill='{"color":"${palette.red}"}' text="Diamond" color="FFFFFF" fontPx="12" alignText="center" />
    <Shape shapeType="rightArrow" w="140" h="60" fill='{"color":"${palette.navy}"}' text="Arrow" color="FFFFFF" fontPx="14" alignText="center" />
  </HStack>
</VStack>
`;

const chartSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Chart Node Example</Text>
  <HStack gap="32">
    <Chart chartType="bar" w="350" h="250" showTitle="true" title="Bar Chart" showLegend="true" chartColors='["${palette.blue}","${palette.green}","${palette.red}"]'>
      <Series name="Q1">
        <DataPoint label="Jan" value="30" />
        <DataPoint label="Feb" value="45" />
        <DataPoint label="Mar" value="60" />
      </Series>
      <Series name="Q2">
        <DataPoint label="Jan" value="40" />
        <DataPoint label="Feb" value="55" />
        <DataPoint label="Mar" value="70" />
      </Series>
    </Chart>
    <Chart chartType="pie" w="300" h="250" showTitle="true" title="Pie Chart" showLegend="true" chartColors='["${palette.blue}","${palette.green}","${palette.accent}","${palette.red}"]'>
      <Series>
        <DataPoint label="Category A" value="35" />
        <DataPoint label="Category B" value="25" />
        <DataPoint label="Category C" value="25" />
        <DataPoint label="Category D" value="15" />
      </Series>
    </Chart>
    <Chart chartType="line" w="350" h="250" showTitle="true" title="Line Chart" showLegend="true" chartColors='["${palette.blue}","${palette.red}"]'>
      <Series name="2023">
        <DataPoint label="Q1" value="20" />
        <DataPoint label="Q2" value="35" />
        <DataPoint label="Q3" value="45" />
        <DataPoint label="Q4" value="60" />
      </Series>
      <Series name="2024">
        <DataPoint label="Q1" value="30" />
        <DataPoint label="Q2" value="50" />
        <DataPoint label="Q3" value="55" />
        <DataPoint label="Q4" value="75" />
      </Series>
    </Chart>
  </HStack>
</VStack>
`;

const timelineSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Timeline Node Example</Text>
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
  <Text fontPx="28" bold="true" color="${palette.navy}">Matrix Node Example</Text>
  <Matrix w="500" h="400">
    <Axes x="Cost" y="Impact" />
    <Quadrants topLeft="Low Cost\nHigh Impact" topRight="High Cost\nHigh Impact" bottomLeft="Low Cost\nLow Impact" bottomRight="High Cost\nLow Impact" />
    <MatrixItem label="Project A" x="0.2" y="0.8" color="${palette.green}" />
    <MatrixItem label="Project B" x="0.7" y="0.85" color="${palette.blue}" />
    <MatrixItem label="Project C" x="0.3" y="0.3" color="${palette.accent}" />
    <MatrixItem label="Project D" x="0.8" y="0.2" color="${palette.red}" />
  </Matrix>
</VStack>
`;

const treeSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Tree Node Example</Text>
  <Tree layout="vertical" nodeShape="roundRect" w="100%" h="400" connectorStyle='{"color":"${palette.charcoal}","width":2}'>
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
  <Text fontPx="28" bold="true" color="${palette.navy}">Flow Node Example</Text>
  <Flow direction="horizontal" w="100%" h="300" connectorStyle='{"color":"${palette.charcoal}","width":2}'>
    <FlowNode id="start" shape="flowChartTerminator" text="Start" color="${palette.green}" />
    <FlowNode id="input" shape="flowChartInputOutput" text="Input Data" color="${palette.lightBlue}" />
    <FlowNode id="process" shape="flowChartProcess" text="Process" color="${palette.blue}" />
    <FlowNode id="decision" shape="flowChartDecision" text="Valid?" color="${palette.accent}" />
    <FlowNode id="end" shape="flowChartTerminator" text="End" color="${palette.red}" />
    <Connection from="start" to="input" />
    <Connection from="input" to="process" />
    <Connection from="process" to="decision" />
    <Connection from="decision" to="end" label="Yes" />
  </Flow>
</VStack>
`;

const processArrowSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">ProcessArrow Node Example</Text>
  <ProcessArrow direction="horizontal" w="100%" h="100">
    <Step label="Planning" color="4472C4" />
    <Step label="Design" color="5B9BD5" />
    <Step label="Development" color="70AD47" />
    <Step label="Testing" color="FFC000" />
    <Step label="Release" color="ED7D31" />
  </ProcessArrow>
  <HStack gap="32">
    <VStack gap="8">
      <Text fontPx="14" bold="true">Default Style</Text>
      <ProcessArrow direction="horizontal" w="400" h="60">
        <Step label="Input" />
        <Step label="Process" />
        <Step label="Output" />
      </ProcessArrow>
    </VStack>
    <VStack gap="8">
      <Text fontPx="14" bold="true">Custom Text Color</Text>
      <ProcessArrow direction="horizontal" w="400" h="60">
        <Step label="Light BG" color="FFEB3B" textColor="333333" />
        <Step label="Dark BG" color="${palette.navy}" textColor="FFFFFF" />
        <Step label="Blue BG" color="${palette.blue}" textColor="FFFFFF" />
      </ProcessArrow>
    </VStack>
  </HStack>
</VStack>
`;

const boxSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">Box Node Example</Text>
  <HStack gap="32">
    <Box w="200" h="150" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="14">Basic Box\nwith padding</Text>
    </Box>
    <Box w="200" h="150" backgroundColor="${palette.lightBlue}" border='{"color":"${palette.blue}","width":2}' borderRadius="8" padding="16">
      <Text fontPx="14" color="${palette.navy}">Rounded Box\nwith border</Text>
    </Box>
    <Box w="200" h="150" backgroundColor="${palette.navy}" borderRadius="16" padding="16">
      <Text fontPx="14" color="FFFFFF">Styled Box\nwith background</Text>
    </Box>
  </HStack>
</VStack>
`;

const vstackSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">VStack Node Example</Text>
  <HStack gap="32">
    <VStack w="200" h="250" gap="8" alignItems="start" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="12" bold="true">alignItems: start</Text>
      <Shape shapeType="rect" w="100" h="40" fill='{"color":"${palette.blue}"}' />
      <Shape shapeType="rect" w="80" h="40" fill='{"color":"${palette.green}"}' />
      <Shape shapeType="rect" w="120" h="40" fill='{"color":"${palette.red}"}' />
    </VStack>
    <VStack w="200" h="250" gap="8" alignItems="center" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="12" bold="true">alignItems: center</Text>
      <Shape shapeType="rect" w="100" h="40" fill='{"color":"${palette.blue}"}' />
      <Shape shapeType="rect" w="80" h="40" fill='{"color":"${palette.green}"}' />
      <Shape shapeType="rect" w="120" h="40" fill='{"color":"${palette.red}"}' />
    </VStack>
    <VStack w="200" h="250" gap="8" alignItems="end" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="12" bold="true">alignItems: end</Text>
      <Shape shapeType="rect" w="100" h="40" fill='{"color":"${palette.blue}"}' />
      <Shape shapeType="rect" w="80" h="40" fill='{"color":"${palette.green}"}' />
      <Shape shapeType="rect" w="120" h="40" fill='{"color":"${palette.red}"}' />
    </VStack>
  </HStack>
</VStack>
`;

const hstackSample = `
<VStack w="100%" h="max" padding="40" gap="24" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">HStack Node Example</Text>
  <VStack gap="16">
    <HStack w="100%" h="80" gap="16" justifyContent="start" alignItems="center" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="12" bold="true" w="150">justifyContent: start</Text>
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.blue}"}' />
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.green}"}' />
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.red}"}' />
    </HStack>
    <HStack w="100%" h="80" gap="16" justifyContent="center" alignItems="center" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="12" bold="true" w="150">justifyContent: center</Text>
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.blue}"}' />
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.green}"}' />
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.red}"}' />
    </HStack>
    <HStack w="100%" h="80" gap="16" justifyContent="spaceBetween" alignItems="center" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}' padding="16">
      <Text fontPx="12" bold="true" w="180">justifyContent: spaceBetween</Text>
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.blue}"}' />
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.green}"}' />
      <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.red}"}' />
    </HStack>
  </VStack>
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
  box: boxSample,
  vstack: vstackSample,
  hstack: hstackSample,
};
