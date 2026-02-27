import { buildPptx } from "./src";

const xml = `
<VStack w="1280" h="720" padding='{"top":24,"bottom":24,"left":48,"right":48}' gap="24" backgroundColor="F8FAFC">
  <Text fontPx="28" bold="true" color="1E293B">Pyramid Node Demo</Text>

  <HStack gap="24" alignItems="stretch">
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="18" bold="true" color="1E293B">Pyramid (up)</Text>
        <Pyramid direction="up" w="500" h="300">
          <Level label="戦略" color="E91E63" />
          <Level label="戦術" color="9C27B0" />
          <Level label="実行" color="673AB7" />
        </Pyramid>
      </VStack>
    </Box>
    <Box w="50%" padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
      <VStack gap="8">
        <Text fontPx="18" bold="true" color="1E293B">Pyramid (down)</Text>
        <Pyramid direction="down" w="500" h="300">
          <Level label="Top" color="4472C4" />
          <Level label="Middle" color="5B9BD5" />
          <Level label="Bottom" color="70AD47" />
        </Pyramid>
      </VStack>
    </Box>
  </HStack>

  <Box padding="16" backgroundColor="FFFFFF" border='{"color":"E2E8F0","width":1}' borderRadius="8">
    <VStack gap="8">
      <Text fontPx="18" bold="true" color="1E293B">Maslow's Hierarchy (5 layers)</Text>
      <Pyramid direction="up" w="800" h="300" fontPx="16" bold="true">
        <Level label="Self-actualization" color="F44336" textColor="FFFFFF" />
        <Level label="Esteem" color="FF9800" textColor="333333" />
        <Level label="Love/Belonging" color="FFEB3B" textColor="333333" />
        <Level label="Safety" color="4CAF50" textColor="FFFFFF" />
        <Level label="Physiological" color="2196F3" textColor="FFFFFF" />
      </Pyramid>
    </VStack>
  </Box>
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
