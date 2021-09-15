package me.ashish.consumers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

import java.io.File;
import java.io.IOException;
import java.util.Iterator;
import java.util.Map;

public class ConsumingWithDomApi {
    private static final File BANK_LOAN_FILE = new File("src/main/resources/bank-loan.json");

    public static void main(String[] args) throws IOException {
        final ObjectMapper objectMapper = new ObjectMapper();
        JsonNode jsonNode = objectMapper.readTree(BANK_LOAN_FILE);
//        ObjectWriter objectWriter = objectMapper.writerWithDefaultPrettyPrinter();
//        System.out.println(objectWriter.writeValueAsString(jsonNode));
        explore(jsonNode);
    }

    public  static void explore(final JsonNode jsonNode) {
        Iterator<Map.Entry<String, JsonNode>> fields = jsonNode.fields();
        while(fields.hasNext()) {
            Map.Entry<String, JsonNode> field = fields.next();
            String fieldName = field.getKey();
            JsonNode value = field.getValue();
            System.out.println(fieldName);
            explore(value);
        }
    }
}
