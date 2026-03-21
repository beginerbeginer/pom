import { palette } from "./palette.js";

// ============================================================
// Page 12: Tree Node Test
// テスト対象: TreeNode - layout, nodeShape, data, connectorStyle
// ============================================================
export const page12TreeXml = `
<VStack w="100%" h="max" padding="48" gap="16" alignItems="stretch" backgroundColor="${palette.background}">
  <Text fontSize="28" color="${palette.charcoal}" bold="true">Page 12: Tree Node Test</Text>
  <HStack gap="16" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"${palette.border}","width":1}'>
      <VStack gap="12">
        <Text fontSize="14" bold="true">Vertical Tree (Organization Chart):</Text>
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
        <Text fontSize="14" bold="true">Horizontal Tree (Decision Tree):</Text>
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
        <Text fontSize="14" bold="true">Ellipse Nodes:</Text>
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
        <Text fontSize="14" bold="true">Custom Spacing:</Text>
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
