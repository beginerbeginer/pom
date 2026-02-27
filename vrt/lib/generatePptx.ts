import { buildPptx } from "../../src";

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

// ============================================================
// Page 1: Text Node Test
// テスト対象: fontPx, color, alignText, bold, italic, underline, strike, highlight, fontFamily, lineSpacingMultiple
// ============================================================
const page1TextXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 1: Text Node Test</Text>
  <!-- fontPx variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">fontPx:</Text>
      <HStack gap="24" alignItems="end">
        <Text fontPx="12">12px</Text>
        <Text fontPx="18">18px</Text>
        <Text fontPx="24">24px</Text>
        <Text fontPx="36">36px</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- color variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">color:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16" color="${palette.charcoal}">charcoal</Text>
        <Text fontPx="16" color="${palette.blue}">blue</Text>
        <Text fontPx="16" color="${palette.red}">red</Text>
        <Text fontPx="16" color="${palette.green}">green</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- alignText variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">alignText:</Text>
      <VStack gap="4">
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontPx="14" alignText="left">left (default)</Text>
        </Box>
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontPx="14" alignText="center">center</Text>
        </Box>
        <Box w="100%" backgroundColor="${palette.lightBlue}" padding="8">
          <Text fontPx="14" alignText="right">right</Text>
        </Box>
      </VStack>
    </VStack>
  </Box>
  <!-- bold variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">bold:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16">Normal text</Text>
        <Text fontPx="16" bold="true">Bold text</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- italic variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">italic:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16">Normal text</Text>
        <Text fontPx="16" italic="true">Italic text</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- underline variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">underline:</Text>
      <HStack gap="24" alignItems="center">
        <Text fontPx="16">Normal</Text>
        <Text fontPx="16" underline="true">Underline (bool)</Text>
        <Text fontPx="16" underline='{"style":"wavy"}'>Underline (wavy)</Text>
        <Text fontPx="16" underline='{"style":"dbl","color":"DC2626"}'>Underline (dbl + color)</Text>
      </HStack>
    </VStack>
  </Box>
  <!-- strike & highlight variations -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">strike:</Text>
        <HStack gap="24" alignItems="center">
          <Text fontPx="16">Normal</Text>
          <Text fontPx="16" strike="true">Strike text</Text>
        </HStack>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">highlight:</Text>
        <HStack gap="24" alignItems="center">
          <Text fontPx="16">Normal</Text>
          <Text fontPx="16" highlight="FFFF00">Yellow highlight</Text>
          <Text fontPx="16" highlight="00FFFF">Cyan highlight</Text>
        </HStack>
      </VStack>
    </Box>
  </HStack>
  <!-- fontFamily & lineSpacingMultiple -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">fontFamily:</Text>
        <Text fontPx="16" fontFamily="Noto Sans JP">Noto Sans JP</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">lineSpacingMultiple:</Text>
        <Text fontPx="14" lineSpacingMultiple="1.5">Line 1\nLine 2\nLine 3</Text>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 2: Bullet Test
// テスト対象: bullet: true, type, numberType, numberStartAt
// ============================================================
const page2BulletXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 2: Bullet Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">bullet: true</Text>
        <Text fontPx="14" bullet="true">Item A\nItem B\nItem C</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">type: "number"</Text>
        <Text fontPx="14" bullet='{"type":"number"}'>First\nSecond\nThird</Text>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">alphaLcPeriod (a. b. c.)</Text>
        <Text fontPx="14" bullet='{"type":"number","numberType":"alphaLcPeriod"}'>Alpha\nBeta\nGamma</Text>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">romanLcPeriod (i. ii. iii.)</Text>
        <Text fontPx="14" bullet='{"type":"number","numberType":"romanLcPeriod"}'>Roman I\nRoman II\nRoman III</Text>
      </VStack>
    </Box>
  </HStack>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">numberStartAt: 5</Text>
      <Text fontPx="14" bullet='{"type":"number","numberStartAt":5}'>Starts at 5\nContinues 6\nAnd 7</Text>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 3: Image Test
// テスト対象: src, w, h
// ============================================================
const page3ImageXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 3: Image Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Size variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="60" h="60" />
          <Text fontPx="12">60x60</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_1.png" w="120" h="90" />
          <Text fontPx="12">120x90</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="180" h="135" />
          <Text fontPx="12">180x135</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Image with container styling:</Text>
      <HStack gap="16" alignItems="start">
        <Box padding="12" backgroundColor="${palette.lightBlue}" border='{"color":"${palette.blue}","width":2}'>
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="80" h="80" />
        </Box>
        <VStack gap="4">
          <Text fontPx="16" bold="true">Image in styled Box</Text>
          <Text fontPx="12">Box with padding, backgroundColor, border</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 3b: Image Sizing Test
// テスト対象: sizing (contain, cover, crop)
// ============================================================
const page3bImageSizingXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 3b: Image Sizing Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Sizing modes:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="150" h="150" sizing='{"type":"contain"}' />
          <Text fontPx="12">contain</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="150" h="150" sizing='{"type":"cover"}' />
          <Text fontPx="12">cover</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Image src="https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png" w="150" h="150" sizing='{"type":"crop","w":100,"h":100,"x":10,"y":10}' />
          <Text fontPx="12">crop (100x100)</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 4: Table Test
// テスト対象: columns, rows, defaultRowHeight, セルプロパティ
// ============================================================
const page4TableXml = `
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

// ============================================================
// Page 5: Shape Test
// テスト対象: shapeType, fill, line, shadow, text
// ============================================================
const page5ShapeXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 5: Shape Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">shapeType variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">rect</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="ellipse" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">ellipse</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="triangle" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">triangle</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="roundRect" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">roundRect</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">fill &amp; line combinations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.blue}"}' />
          <Text fontPx="12">fill only</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">line only</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="60" h="40" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}' />
          <Text fontPx="12">fill + line</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">line.dashType variations:</Text>
      <HStack gap="24" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="80" h="40" line='{"color":"${palette.charcoal}","width":2,"dashType":"solid"}' />
          <Text fontPx="12">solid</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="80" h="40" line='{"color":"${palette.charcoal}","width":2,"dashType":"dash"}' />
          <Text fontPx="12">dash</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Shape shapeType="rect" w="80" h="40" line='{"color":"${palette.charcoal}","width":2,"dashType":"dashDot"}' />
          <Text fontPx="12">dashDot</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Shape with text:</Text>
      <HStack gap="24" alignItems="center">
        <Shape shapeType="ellipse" w="80" h="80" fontPx="14" fill='{"color":"${palette.lightBlue}"}' line='{"color":"${palette.blue}","width":2}'>Circle</Shape>
        <Shape shapeType="rect" w="100" h="50" fontPx="14" bold="true" fill='{"color":"${palette.navy}"}' color="FFFFFF">Rectangle</Shape>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 6: Chart Test
// テスト対象: chartType, data, showLegend, showTitle, chartColors
// ============================================================
const page6ChartXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 6: Chart Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Bar Chart</Text>
        <Chart chartType="bar" w="400" h="180" showLegend="true" chartColors='["0088CC","00AA00"]'>
          <Series name="Sales">
            <DataPoint label="Q1" value="100" />
            <DataPoint label="Q2" value="200" />
            <DataPoint label="Q3" value="150" />
            <DataPoint label="Q4" value="300" />
          </Series>
          <Series name="Profit">
            <DataPoint label="Q1" value="30" />
            <DataPoint label="Q2" value="60" />
            <DataPoint label="Q3" value="45" />
            <DataPoint label="Q4" value="90" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Line Chart</Text>
        <Chart chartType="line" w="400" h="180" showLegend="true" chartColors='["${palette.blue}"]'>
          <Series name="Revenue">
            <DataPoint label="Jan" value="50" />
            <DataPoint label="Feb" value="80" />
            <DataPoint label="Mar" value="60" />
            <DataPoint label="Apr" value="120" />
            <DataPoint label="May" value="100" />
            <DataPoint label="Jun" value="150" />
          </Series>
        </Chart>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Pie Chart (with title)</Text>
        <Chart chartType="pie" w="400" h="180" showLegend="true" showTitle="true" title="Market Share" chartColors='["0088CC","00AA00","FF6600","888888"]'>
          <Series name="Share">
            <DataPoint label="A" value="40" />
            <DataPoint label="B" value="30" />
            <DataPoint label="C" value="20" />
            <DataPoint label="D" value="10" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Bar Chart (with title)</Text>
        <Chart chartType="bar" w="400" h="180" showLegend="true" showTitle="true" title="Regional Sales" chartColors='["${palette.blue}","${palette.accent}"]'>
          <Series name="2023">
            <DataPoint label="N" value="250" />
            <DataPoint label="S" value="180" />
            <DataPoint label="E" value="220" />
            <DataPoint label="W" value="150" />
          </Series>
          <Series name="2024">
            <DataPoint label="N" value="300" />
            <DataPoint label="S" value="200" />
            <DataPoint label="E" value="250" />
            <DataPoint label="W" value="180" />
          </Series>
        </Chart>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 7: Layout Test (VStack / HStack / Box)
// テスト対象: gap, alignItems, justifyContent
// ============================================================
const page7LayoutXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 7: Layout Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack gap:</Text>
      <HStack gap="8" alignItems="stretch">
        <Box padding="8" backgroundColor="${palette.lightBlue}">
          <HStack gap="8">
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </HStack>
        </Box>
        <Text fontPx="12">gap: 8</Text>
        <Box padding="8" backgroundColor="${palette.lightBlue}">
          <HStack gap="32">
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            <Box w="40" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </HStack>
        </Box>
        <Text fontPx="12">gap: 32</Text>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack alignItems:</Text>
      <HStack gap="16" alignItems="stretch">
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="start">
              <Box w="30" h="20" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">start</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="center">
              <Box w="30" h="20" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">center</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="end">
              <Box w="30" h="20" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">end</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="120" h="60" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" alignItems="stretch">
              <Box w="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">stretch</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack justifyContent:</Text>
      <HStack gap="16" alignItems="stretch">
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" justifyContent="start">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">start</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" justifyContent="center">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">center</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack gap="4" justifyContent="end">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">end</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="140" h="40" padding="4" backgroundColor="${palette.lightBlue}">
            <HStack justifyContent="spaceBetween">
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
              <Box w="30" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
            </HStack>
          </Box>
          <Text fontPx="12">spaceBetween</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 8: Common Properties Test
// テスト対象: w/h, padding, backgroundColor, border
// ============================================================
const page8CommonXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 8: Common Properties Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">w/h variations:</Text>
      <HStack gap="16" alignItems="end">
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          <Text fontPx="12">w:80, h:40</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="30%" h="40" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          <Text fontPx="12">w:"30%"</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">padding variations:</Text>
      <HStack gap="16" alignItems="start">
        <VStack gap="4" alignItems="center">
          <Box padding="8" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </Box>
          <Text fontPx="12">padding: 8</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box padding="24" backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </Box>
          <Text fontPx="12">padding: 24</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box padding='{"top":20,"right":8,"bottom":4,"left":8}' backgroundColor="${palette.lightBlue}">
            <Box w="60" h="30" backgroundColor="${palette.blue}"><Text text=""></Text></Box>
          </Box>
          <Text fontPx="12">top:20, bottom:4</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">border variations:</Text>
      <HStack gap="16" alignItems="center">
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" border='{"color":"${palette.charcoal}","width":1}'><Text text=""></Text></Box>
          <Text fontPx="12">width: 1</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" border='{"color":"${palette.charcoal}","width":3}'><Text text=""></Text></Box>
          <Text fontPx="12">width: 3</Text>
        </VStack>
        <VStack gap="4" alignItems="center">
          <Box w="80" h="40" border='{"color":"${palette.blue}","width":2}'><Text text=""></Text></Box>
          <Text fontPx="12">color: blue</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">backgroundColor variations:</Text>
      <HStack gap="16" alignItems="center">
        <Box w="80" h="40" backgroundColor="${palette.lightBlue}"><Text text=""></Text></Box>
        <Box w="80" h="40" backgroundColor="${palette.navy}" borderRadius="8"><Text text=""></Text></Box>
        <Box w="80" h="40" backgroundColor="${palette.blue}" borderRadius="16"><Text text=""></Text></Box>
        <Box w="80" h="40" backgroundColor="${palette.green}" borderRadius="20"><Text text=""></Text></Box>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 9: Timeline Test
// テスト対象: direction (horizontal/vertical), items, color
// ============================================================
const page9TimelineXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 9: Timeline Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Horizontal Timeline (Roadmap):</Text>
      <Timeline direction="horizontal" w="1100" h="120">
        <TimelineItem date="2025/Q1" title="Phase 1" description="基盤構築" color="4CAF50" />
        <TimelineItem date="2025/Q2" title="Phase 2" description="機能開発" color="2196F3" />
        <TimelineItem date="2025/Q3" title="Phase 3" description="テスト" color="FF9800" />
        <TimelineItem date="2025/Q4" title="Phase 4" description="リリース" color="E91E63" />
      </Timeline>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Vertical Timeline (Project Plan):</Text>
        <Timeline direction="vertical" w="500" h="300">
          <TimelineItem date="Week 1" title="Planning" description="要件定義・設計" color="${palette.blue}" />
          <TimelineItem date="Week 2-3" title="Development" description="実装・レビュー" color="${palette.accent}" />
          <TimelineItem date="Week 4" title="Release" description="デプロイ・監視" color="${palette.green}" />
        </Timeline>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Milestones (Default color):</Text>
        <Timeline direction="vertical" w="500" h="300">
          <TimelineItem date="Jan" title="Kickoff" />
          <TimelineItem date="Mar" title="MVP Launch" />
          <TimelineItem date="Jun" title="GA Release" />
          <TimelineItem date="Dec" title="v2.0" />
        </Timeline>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 10: Additional Chart Types Test
// テスト対象: area, doughnut, radar
// ============================================================
const page10ChartAdditionalXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 10: Additional Chart Types</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="33%" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Area Chart</Text>
        <Chart chartType="area" w="350" h="200" showLegend="true" chartColors='["0088CC"]'>
          <Series name="Revenue">
            <DataPoint label="Jan" value="30" />
            <DataPoint label="Feb" value="50" />
            <DataPoint label="Mar" value="40" />
            <DataPoint label="Apr" value="70" />
            <DataPoint label="May" value="60" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="33%" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Doughnut Chart</Text>
        <Chart chartType="doughnut" w="350" h="200" showLegend="true" chartColors='["0088CC","00AA00","FF6600","888888"]'>
          <Series name="Share">
            <DataPoint label="A" value="35" />
            <DataPoint label="B" value="25" />
            <DataPoint label="C" value="25" />
            <DataPoint label="D" value="15" />
          </Series>
        </Chart>
      </VStack>
    </Box>
    <Box w="33%" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="8">
        <Text fontPx="14" bold="true">Radar Chart</Text>
        <Chart chartType="radar" w="350" h="200" showLegend="true" chartColors='["0088CC"]' radarStyle="filled">
          <Series name="Skills">
            <DataPoint label="Tech" value="80" />
            <DataPoint label="Design" value="60" />
            <DataPoint label="PM" value="70" />
            <DataPoint label="Sales" value="50" />
            <DataPoint label="Support" value="90" />
          </Series>
        </Chart>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 11: Matrix Test
// テスト対象: axes, quadrants, items, coordinate system
// ============================================================
const page11MatrixXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 11: Matrix Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Cost-Effectiveness Matrix (with quadrants):</Text>
        <Matrix w="500" h="400">
          <Axes x="コスト" y="効果" />
          <Quadrants topLeft="低コスト高効果\n（優先実施）" topRight="高コスト高効果\n（検討）" bottomLeft="低コスト低効果\n（様子見）" bottomRight="高コスト低効果\n（見送り）" />
          <MatrixItem label="施策A" x="0.2" y="0.8" color="4CAF50" />
          <MatrixItem label="施策B" x="0.7" y="0.6" color="2196F3" />
          <MatrixItem label="施策C" x="0.3" y="0.3" color="FF9800" />
          <MatrixItem label="施策D" x="0.8" y="0.2" color="E91E63" />
        </Matrix>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Impact-Effort Matrix (without quadrants):</Text>
        <Matrix w="500" h="400">
          <Axes x="Effort" y="Impact" />
          <MatrixItem label="Quick Win" x="0.15" y="0.85" />
          <MatrixItem label="Major Project" x="0.75" y="0.75" />
          <MatrixItem label="Fill-In" x="0.25" y="0.25" />
          <MatrixItem label="Time Sink" x="0.85" y="0.15" />
          <MatrixItem label="Feature X" x="0.5" y="0.5" />
        </Matrix>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 12: Tree Node Test
// テスト対象: TreeNode - layout, nodeShape, data, connectorStyle
// ============================================================
const page12TreeXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 12: Tree Node Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Vertical Tree (Organization Chart):</Text>
        <Tree layout="vertical" nodeShape="roundRect" w="550" h="350" connectorStyle='{"color":"333333","width":2}'>
          <TreeItem label="CEO" color="1D4ED8">
            <TreeItem label="CTO" color="0EA5E9">
              <TreeItem label="Engineer A" />
              <TreeItem label="Engineer B" />
            </TreeItem>
            <TreeItem label="CFO" color="16A34A">
              <TreeItem label="Accountant" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Horizontal Tree (Decision Tree):</Text>
        <Tree layout="horizontal" nodeShape="rect" w="550" h="350">
          <TreeItem label="Start">
            <TreeItem label="Option A">
              <TreeItem label="Result 1" />
              <TreeItem label="Result 2" />
            </TreeItem>
            <TreeItem label="Option B">
              <TreeItem label="Result 3" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </VStack>
    </Box>
  </HStack>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Ellipse Nodes:</Text>
        <Tree layout="vertical" nodeShape="ellipse" w="550" h="200" nodeWidth="100" nodeHeight="50" connectorStyle='{"color":"64748B","width":1}'>
          <TreeItem label="Root" color="DC2626">
            <TreeItem label="Child 1" color="2563EB" />
            <TreeItem label="Child 2" color="16A34A" />
            <TreeItem label="Child 3" color="CA8A04" />
          </TreeItem>
        </Tree>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Custom Spacing:</Text>
        <Tree layout="horizontal" nodeShape="roundRect" w="550" h="200" nodeWidth="80" nodeHeight="30" levelGap="80" siblingGap="10" connectorStyle='{"color":"0EA5E9","width":3}'>
          <TreeItem label="A">
            <TreeItem label="B">
              <TreeItem label="D" />
              <TreeItem label="E" />
            </TreeItem>
            <TreeItem label="C">
              <TreeItem label="F" />
            </TreeItem>
          </TreeItem>
        </Tree>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 13: Flow Node Test
// テスト対象: FlowNode - direction, nodes, connections, connectorStyle
// ============================================================
const page13FlowXml = `
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

// ============================================================
// Page 14: ProcessArrow Node Test
// テスト対象: ProcessArrowNode - direction, steps, itemWidth, itemHeight, gap
// ============================================================
const page14ProcessArrowXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 14: ProcessArrow Node Test</Text>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Horizontal Process Arrow (5 steps with colors):</Text>
      <ProcessArrow direction="horizontal" w="1100" h="80">
        <Step label="企画" color="#4472C4" />
        <Step label="設計" color="#5B9BD5" />
        <Step label="開発" color="#70AD47" />
        <Step label="テスト" color="#FFC000" />
        <Step label="リリース" color="#ED7D31" />
      </ProcessArrow>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">3 Steps (Auto width):</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Input" />
          <Step label="Process" />
          <Step label="Output" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Single Step:</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Only One Step" color="#E91E63" />
        </ProcessArrow>
      </VStack>
    </Box>
  </HStack>
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Custom itemWidth, itemHeight &amp; fontPx:</Text>
      <ProcessArrow direction="horizontal" w="1100" h="100" itemWidth="200" itemHeight="80" fontPx="18" bold="true">
        <Step label="Step 1" color="#2196F3" />
        <Step label="Step 2" color="#00BCD4" />
        <Step label="Step 3" color="#009688" />
      </ProcessArrow>
    </VStack>
  </Box>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Vertical Process Arrow:</Text>
        <ProcessArrow direction="vertical" w="200" h="250">
          <Step label="Phase 1" color="#4CAF50" />
          <Step label="Phase 2" color="#2196F3" />
          <Step label="Phase 3" color="#9C27B0" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Custom textColor:</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Light BG" color="#FFEB3B" textColor="#333333" />
          <Step label="Dark BG" color="#1E293B" textColor="#FFFFFF" />
          <Step label="Blue BG" color="#1D4ED8" textColor="#FFFFFF" />
        </ProcessArrow>
      </VStack>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 15: Line Node Test
// テスト対象: LineNode - x1, y1, x2, y2, color, lineWidth, dashType, beginArrow, endArrow
// ============================================================
const page15LineXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 15: Line Node Test</Text>
  <!-- 水平線・垂直線・斜線 -->
  <Line x1="100" y1="100" x2="300" y2="100" color="FF0000" lineWidth="2" />
  <Line x1="100" y1="120" x2="100" y2="250" color="00FF00" lineWidth="2" />
  <Line x1="150" y1="120" x2="300" y2="250" color="0000FF" lineWidth="2" />
  <Line x1="350" y1="120" x2="200" y2="250" color="FF00FF" lineWidth="2" />
  <!-- 矢印付き線 -->
  <Line x1="400" y1="100" x2="600" y2="100" color="333333" lineWidth="2" endArrow="true" />
  <Line x1="400" y1="130" x2="600" y2="130" color="333333" lineWidth="2" beginArrow="true" endArrow="true" />
  <!-- 矢印タイプ指定 -->
  <Line x1="400" y1="160" x2="600" y2="160" color="1D4ED8" lineWidth="2" endArrow='{"type":"diamond"}' />
  <Line x1="400" y1="190" x2="600" y2="190" color="16A34A" lineWidth="2" endArrow='{"type":"stealth"}' />
  <Line x1="400" y1="220" x2="600" y2="220" color="DC2626" lineWidth="2" endArrow='{"type":"oval"}' />
  <!-- 破線 -->
  <Line x1="650" y1="100" x2="850" y2="100" color="333333" lineWidth="2" dashType="dash" />
  <Line x1="650" y1="130" x2="850" y2="130" color="333333" lineWidth="2" dashType="dashDot" />
  <Line x1="650" y1="160" x2="850" y2="160" color="333333" lineWidth="2" dashType="lgDash" />
  <!-- 太さのバリエーション -->
  <Line x1="650" y1="200" x2="850" y2="200" color="0F172A" lineWidth="1" />
  <Line x1="650" y1="220" x2="850" y2="220" color="0F172A" lineWidth="3" />
  <Line x1="650" y1="245" x2="850" y2="245" color="0F172A" lineWidth="6" />
  <!-- 斜線 + 矢印（4方向） -->
  <Line x1="900" y1="100" x2="1050" y2="200" color="${palette.blue}" lineWidth="2" endArrow="true" />
  <Line x1="1100" y1="100" x2="950" y2="200" color="${palette.red}" lineWidth="2" endArrow="true" />
  <Line x1="900" y1="250" x2="1050" y2="150" color="${palette.green}" lineWidth="2" endArrow="true" />
  <Line x1="1100" y1="250" x2="950" y2="150" color="FF6600" lineWidth="2" endArrow="true" />
</VStack>
`;

// ============================================================
// Page 16: Layer Node Test
// テスト対象: LayerNode - 絶対配置、子要素のオーバーラップ、layer in VStack
// ============================================================
const page16LayerXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 16: Layer Node Test</Text>
  <!-- 基本的な絶対配置（重なり合う図形） -->
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">Overlapping Shapes:</Text>
        <Layer w="500" h="200" backgroundColor="F0F4F8">
          <Shape shapeType="rect" w="120" h="100" x="30" y="30" fill='{"color":"${palette.blue}"}' color="FFFFFF" fontPx="14">Back</Shape>
          <Shape shapeType="rect" w="120" h="100" x="80" y="60" fill='{"color":"${palette.red}"}' color="FFFFFF" fontPx="14">Front</Shape>
          <Text x="220" y="80" fontPx="12" color="${palette.charcoal}">Shapes overlap (red is on top)</Text>
        </Layer>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontPx="14" bold="true">VStack inside Layer:</Text>
        <Layer w="500" h="200" backgroundColor="F0F4F8">
          <VStack x="20" y="20" w="180" gap="8" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
            <Text fontPx="12" bold="true">Left VStack</Text>
            <Text fontPx="11">Item 1</Text>
            <Text fontPx="11">Item 2</Text>
          </VStack>
          <VStack x="260" y="20" w="180" gap="8" padding="12" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
            <Text fontPx="12" bold="true">Right VStack</Text>
            <Text fontPx="11">Item A</Text>
            <Text fontPx="11">Item B</Text>
          </VStack>
        </Layer>
      </VStack>
    </Box>
  </HStack>
  <!-- Line ノードとの組み合わせ -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Layer with Line (connection diagram):</Text>
      <Layer w="1100" h="200" backgroundColor="F8FAFC">
        <!-- 左のボックス -->
        <Shape shapeType="roundRect" w="150" h="80" x="50" y="60" fill='{"color":"${palette.blue}"}' color="FFFFFF" fontPx="14">Service A</Shape>
        <!-- 中央のボックス -->
        <Shape shapeType="roundRect" w="150" h="80" x="350" y="60" fill='{"color":"${palette.green}"}' color="FFFFFF" fontPx="14">Service B</Shape>
        <!-- 右のボックス -->
        <Shape shapeType="roundRect" w="150" h="80" x="650" y="60" fill='{"color":"${palette.accent}"}' color="FFFFFF" fontPx="14">Service C</Shape>
        <!-- 接続線 -->
        <Line x1="200" y1="100" x2="350" y2="100" color="333333" lineWidth="2" endArrow="true" />
        <Line x1="500" y1="100" x2="650" y2="100" color="333333" lineWidth="2" endArrow="true" />
        <!-- ラベル -->
        <Text x="240" y="70" fontPx="10" color="${palette.charcoal}">API Call</Text>
        <Text x="550" y="70" fontPx="10" color="${palette.charcoal}">Event</Text>
      </Layer>
    </VStack>
  </Box>
  <!-- ネストした layer -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">Nested Layer:</Text>
      <Layer w="600" h="150" backgroundColor="E3F2FD">
        <Text x="10" y="10" fontPx="12" bold="true">Outer Layer</Text>
        <Layer x="50" y="40" w="200" h="80" backgroundColor="FFF3E0">
          <Text x="10" y="30" fontPx="11">Inner Layer 1</Text>
        </Layer>
        <Layer x="280" y="40" w="200" h="80" backgroundColor="E8F5E9">
          <Text x="10" y="30" fontPx="11">Inner Layer 2</Text>
        </Layer>
      </Layer>
    </VStack>
  </Box>
</VStack>
`;

// ===================== Page 17: HStack + Table 幅計算 =====================
const page17HStackTableXml = `
<VStack gap="16" padding="48">
  <Text fontPx="22" bold="true">17. HStack + Table Width Calculation</Text>
  <!-- テーブルが固有サイズを保持するケース -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="14" bold="true">HStack with table (table should keep intrinsic width):</Text>
      <HStack gap="16">
        <Text fontPx="14">Left text</Text>
        <Table defaultRowHeight="28">
          <Column width="80" />
          <Column width="120" />
          <Column width="80" />
          <Row>
            <Cell fontPx="12" bold="true" backgroundColor="${palette.lightBlue}">A</Cell>
            <Cell fontPx="12" bold="true" backgroundColor="${palette.lightBlue}">B</Cell>
            <Cell fontPx="12" bold="true" backgroundColor="${palette.lightBlue}">C</Cell>
          </Row>
          <Row>
            <Cell fontPx="12">1</Cell>
            <Cell fontPx="12">Data</Cell>
            <Cell fontPx="12">OK</Cell>
          </Row>
        </Table>
        <Text fontPx="14">Right text</Text>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 18: Opacity Test
// テスト対象: opacity（背景色の透過度）
// ============================================================
const page18OpacityXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 18: Opacity Test</Text>
  <!-- opacity variations -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">opacity:</Text>
      <HStack gap="16" alignItems="stretch">
        <Box w="150" h="80" backgroundColor="${palette.blue}" opacity="1.0">
          <Text fontPx="12" color="FFFFFF">opacity: 1.0</Text>
        </Box>
        <Box w="150" h="80" backgroundColor="${palette.blue}" opacity="0.8">
          <Text fontPx="12" color="FFFFFF">opacity: 0.8</Text>
        </Box>
        <Box w="150" h="80" backgroundColor="${palette.blue}" opacity="0.5">
          <Text fontPx="12" color="FFFFFF">opacity: 0.5</Text>
        </Box>
        <Box w="150" h="80" backgroundColor="${palette.blue}" opacity="0.2">
          <Text fontPx="12" color="FFFFFF">opacity: 0.2</Text>
        </Box>
      </HStack>
    </VStack>
  </Box>
  <!-- Layer + opacity overlay -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">Layer + opacity overlay:</Text>
      <Layer w="400" h="120">
        <Box x="0" y="0" w="400" h="120" backgroundColor="${palette.navy}">
          <Text fontPx="16" color="FFFFFF">Background</Text>
        </Box>
        <Box x="0" y="0" w="400" h="120" backgroundColor="${palette.red}" opacity="0.4">
          <Text fontPx="14" color="FFFFFF">Overlay (opacity: 0.4)</Text>
        </Box>
      </Layer>
    </VStack>
  </Box>
  <!-- Different node types with opacity -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="8">
      <Text fontPx="14" bold="true">Different nodes with opacity:</Text>
      <HStack gap="16" alignItems="stretch">
        <Text fontPx="14" backgroundColor="${palette.green}" opacity="0.5" color="FFFFFF" w="180" h="60">Text with opacity</Text>
        <VStack w="180" h="60" backgroundColor="${palette.accent}" opacity="0.5">
          <Text fontPx="14" color="FFFFFF">VStack with opacity</Text>
        </VStack>
      </HStack>
    </VStack>
  </Box>
</VStack>
`;

// ============================================================
// Page 19: Shadow Test
// テスト対象: Box shadow, Image shadow, Shape shadow
// ============================================================
const page19ShadowXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 19: Shadow Test</Text>
  <!-- Box with outer shadow -->
  <HStack gap="24" alignItems="start">
    <Box w="200" h="100" padding="16" backgroundColor="FFFFFF" borderRadius="8" shadow='{"type":"outer","color":"000000","blur":6,"offset":3,"angle":315,"opacity":0.3}'>
      <Text fontPx="14" color="${palette.charcoal}">Box: outer shadow</Text>
    </Box>
    <!-- Box with inner shadow -->
    <Box w="200" h="100" padding="16" backgroundColor="FFFFFF" borderRadius="8" shadow='{"type":"inner","color":"000000","blur":4,"offset":2,"angle":315,"opacity":0.2}'>
      <Text fontPx="14" color="${palette.charcoal}">Box: inner shadow</Text>
    </Box>
    <!-- Box with shadow + border -->
    <Box w="200" h="100" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.blue}","width":2}' borderRadius="8" shadow='{"type":"outer","color":"${palette.blue}","blur":8,"offset":4,"angle":315,"opacity":0.4}'>
      <Text fontPx="14" color="${palette.charcoal}">Box: shadow + border</Text>
    </Box>
  </HStack>
  <!-- Shape with shadow (various shape types) -->
  <HStack gap="24" alignItems="start">
    <Shape shapeType="ellipse" w="150" h="100" fill='{"color":"${palette.lightBlue}"}' shadow='{"type":"outer","color":"000000","blur":6,"offset":3,"angle":315,"opacity":0.3}' fontPx="12" color="${palette.charcoal}">Ellipse shadow</Shape>
    <Shape shapeType="roundRect" w="150" h="100" fill='{"color":"${palette.lightBlue}"}' shadow='{"type":"outer","color":"${palette.navy}","blur":10,"offset":5,"angle":270,"opacity":0.5}' fontPx="12" color="${palette.charcoal}">RoundRect shadow</Shape>
  </HStack>
  <!-- Image with shadow -->
  <HStack gap="24" alignItems="start">
    <Box w="180" h="120">
      <Image src="https://placehold.co/180x120/DBEAFE/1D4ED8?text=Shadow" w="180" h="120" shadow='{"type":"outer","color":"000000","blur":8,"offset":4,"angle":315,"opacity":0.4}' />
    </Box>
  </HStack>
  <!-- Box with shadow only (no background, no border) -->
  <HStack gap="24" alignItems="start">
    <Box w="200" h="80" padding="16" shadow='{"type":"outer","color":"000000","blur":6,"offset":3,"angle":315,"opacity":0.3}'>
      <Text fontPx="14" color="${palette.charcoal}">Shadow only (no bg)</Text>
    </Box>
  </HStack>
</VStack>
`;

// ============================================================
// Page 20: Background Image Test
// テスト対象: backgroundImage (cover / contain)
// ============================================================
const page20BackgroundImageXml = `
<VStack w="100%" h="max" padding="48" gap="20" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontPx="28" color="${palette.charcoal}" bold="true">Page 20: Background Image Test</Text>
  <!-- backgroundImage sizing modes -->
  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
    <VStack gap="12">
      <Text fontPx="16" color="${palette.charcoal}" bold="true">Background Image Sizing Modes:</Text>
      <HStack gap="16">
        <!-- cover モード -->
        <Box w="280" h="180" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png","sizing":"cover"}' border='{"color":"${palette.border}","width":2}'>
          <Text fontPx="16" color="FFFFFF" bold="true">cover</Text>
        </Box>
        <!-- contain モード -->
        <Box w="280" h="180" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png","sizing":"contain"}' backgroundColor="333333" border='{"color":"${palette.border}","width":2}'>
          <Text fontPx="16" color="FFFFFF" bold="true">contain (with backgroundColor)</Text>
        </Box>
        <!-- デフォルト（cover） -->
        <Box w="280" h="180" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_1.png"}' border='{"color":"${palette.border}","width":2}'>
          <Text fontPx="16" color="FFFFFF" bold="true">default (cover)</Text>
        </Box>
      </HStack>
    </VStack>
  </Box>
  <!-- VStack with backgroundImage -->
  <VStack gap="8" padding="16" backgroundImage='{"src":"https://raw.githubusercontent.com/hirokisakabe/pom/main/sample_images/sample_0.png","sizing":"cover"}' border='{"color":"${palette.border}","width":1}'>
    <Text fontPx="16" color="FFFFFF" bold="true">VStack with backgroundImage</Text>
    <Text fontPx="14" color="FFFFFF">Background image on VStack container</Text>
  </VStack>
</VStack>
`;

// ============================================================
// Page 21: XML Child Element Notation Test
// テスト対象: parseXml の子要素記法（Chart, Table, Timeline, ProcessArrow, Tree）
// ============================================================
const page21XmlChildElementsXml = `
<VStack gap="8" padding="48" backgroundColor="${palette.background}">
  <Text fontPx="28" bold="true" color="${palette.navy}">XML Child Element Notation</Text>
  <HStack gap="16" alignItems="start">
    <VStack gap="8" w="380">
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Chart (Series/DataPoint)</Text>
      <Chart chartType="bar" w="380" h="140">
        <Series name="Q1">
          <DataPoint label="Jan" value="100" />
          <DataPoint label="Feb" value="120" />
          <DataPoint label="Mar" value="90" />
        </Series>
      </Chart>
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Table (Column/Row/Cell)</Text>
      <Table w="380">
        <Column width="190" />
        <Column width="190" />
        <Row>
          <Cell bold="true" backgroundColor="${palette.lightBlue}">Name</Cell>
          <Cell bold="true" backgroundColor="${palette.lightBlue}">Score</Cell>
        </Row>
        <Row>
          <Cell>Alice</Cell>
          <Cell>95</Cell>
        </Row>
        <Row>
          <Cell>Bob</Cell>
          <Cell>87</Cell>
        </Row>
      </Table>
    </VStack>
    <VStack gap="8" w="380">
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Timeline (TimelineItem)</Text>
      <Timeline direction="horizontal" w="380" h="120">
        <TimelineItem date="2024-01" title="Plan" color="${palette.blue}" />
        <TimelineItem date="2024-04" title="Build" color="${palette.accent}" />
        <TimelineItem date="2024-07" title="Launch" color="${palette.green}" />
      </Timeline>
      <Text fontPx="14" bold="true" color="${palette.charcoal}">ProcessArrow (Step)</Text>
      <ProcessArrow direction="horizontal" w="380" h="60">
        <Step label="Plan" color="${palette.blue}" />
        <Step label="Build" color="${palette.accent}" />
        <Step label="Launch" color="${palette.green}" />
      </ProcessArrow>
      <Text fontPx="14" bold="true" color="${palette.charcoal}">Tree (TreeItem)</Text>
      <Tree layout="vertical" w="380" h="140">
        <TreeItem label="CEO" color="${palette.navy}">
          <TreeItem label="CTO" color="${palette.blue}">
            <TreeItem label="Dev" />
          </TreeItem>
          <TreeItem label="CFO" color="${palette.accent}" />
        </TreeItem>
      </Tree>
    </VStack>
  </HStack>
</VStack>
`;

export async function generatePptx(outputPath: string): Promise<void> {
  const allPagesXml = [
    page1TextXml,
    page2BulletXml,
    page3ImageXml,
    page3bImageSizingXml,
    page4TableXml,
    page5ShapeXml,
    page6ChartXml,
    page7LayoutXml,
    page8CommonXml,
    page9TimelineXml,
    page10ChartAdditionalXml,
    page11MatrixXml,
    page12TreeXml,
    page13FlowXml,
    page14ProcessArrowXml,
    page15LineXml,
    page16LayerXml,
    page17HStackTableXml,
    page18OpacityXml,
    page19ShadowXml,
    page20BackgroundImageXml,
    page21XmlChildElementsXml,
  ].join("\n");

  const pptx = await buildPptx(
    allPagesXml,
    {
      w: 1280,
      h: 720,
    },
    {
      master: {
        title: "VRT_MASTER",
        objects: [
          // ヘッダー背景
          {
            type: "rect",
            x: 0,
            y: 0,
            w: 1280,
            h: 40,
            fill: { color: palette.navy },
          },
          // ヘッダーテキスト（左）
          {
            type: "text",
            text: "VRT Test Suite",
            x: 48,
            y: 12,
            w: 200,
            h: 28,
            fontPx: 14,
            color: "FFFFFF",
          },
          // ヘッダーテキスト（右）- 日付は固定値
          {
            type: "text",
            text: "2025/01/01",
            x: 1032,
            y: 12,
            w: 200,
            h: 28,
            fontPx: 12,
            color: "E2E8F0",
            alignText: "right",
          },
          // フッターテキスト（左）
          {
            type: "text",
            text: "pom VRT",
            x: 48,
            y: 682,
            w: 200,
            h: 30,
            fontPx: 10,
            color: palette.charcoal,
          },
        ],
        slideNumber: {
          x: 1032,
          y: 682,
          w: 200,
          h: 30,
          fontPx: 10,
          color: palette.charcoal,
        },
      },
    },
  );

  await pptx.writeFile({ fileName: outputPath });
}
