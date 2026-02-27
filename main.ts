import { buildPptx } from "./src";

const xml = `
<VStack w="1280" h="720" padding='{"top":24,"bottom":24,"left":48,"right":48}' gap="24" backgroundColor="F8FAFC">
  <Text fontPx="28" bold="true" color="1E293B">Process Arrow Demo</Text>

  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
    <VStack gap="8">
      <Text fontPx="20" bold="true" color="1E293B">Horizontal Process Arrow</Text>
      <ProcessArrow direction="horizontal" w="1100" h="80">
        <Step label="企画" color="#4472C4" />
        <Step label="設計" color="#5B9BD5" />
        <Step label="開発" color="#70AD47" />
        <Step label="テスト" color="#FFC000" />
        <Step label="リリース" color="#ED7D31" />
      </ProcessArrow>
    </VStack>
  </Box>

  <HStack gap="24">
    <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="20" bold="true" color="1E293B">3 Steps (Default color)</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Input" />
          <Step label="Process" />
          <Step label="Output" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="20" bold="true" color="0F172A">Custom Colors</Text>
        <ProcessArrow direction="horizontal" w="500" h="60">
          <Step label="Step 1" color="#2196F3" />
          <Step label="Step 2" color="#00BCD4" />
          <Step label="Step 3" color="#009688" />
        </ProcessArrow>
      </VStack>
    </Box>
  </HStack>

  <HStack gap="24">
    <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="20" bold="true" color="1E293B">Vertical</Text>
        <ProcessArrow direction="vertical" w="150" h="200">
          <Step label="Phase 1" color="#4CAF50" />
          <Step label="Phase 2" color="#2196F3" />
          <Step label="Phase 3" color="#9C27B0" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="20" bold="true" color="1E293B">Single Step</Text>
        <ProcessArrow direction="horizontal" w="200" h="60">
          <Step label="Only One" color="#E91E63" />
        </ProcessArrow>
      </VStack>
    </Box>
    <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="20" bold="true" color="1E293B">Custom textColor</Text>
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

async function main() {
  const pptx = await buildPptx(xml, {
    w: 1280,
    h: 720,
  });

  await pptx.writeFile({ fileName: "sample.pptx" });
}

main();
