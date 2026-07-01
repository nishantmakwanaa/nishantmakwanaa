from sentence_transformers import SentenceTransformer
import chromadb
import ollama



# ======================
# Load embedding model
# ======================

embedder = SentenceTransformer(
    "all-MiniLM-L6-v2"
)



# ======================
# Vector database
# ======================

client = chromadb.Client()


collection = client.get_or_create_collection(
    "knowledge"
)



# ======================
# Load documents
# ======================

with open(
    "documents.txt",
    "r"
) as f:

    docs=f.readlines()



# Store documents

for i,doc in enumerate(docs):

    vector = embedder.encode(
        doc
    ).tolist()


    collection.add(

        ids=[str(i)],

        documents=[doc],

        embeddings=[vector]
    )



print(
"Knowledge loaded"
)



# ======================
# Chat
# ======================


while True:


    question=input(
        "\nYou: "
    )


    if question=="exit":
        break



    q_vector = embedder.encode(
        question
    ).tolist()



    result = collection.query(

        query_embeddings=[
            q_vector
        ],

        n_results=3
    )



    context = "\n".join(
        result["documents"][0]
    )



    prompt=f"""

You are a helpful assistant.

Answer using this context:

{context}


Question:
{question}

Answer:

"""



    response = ollama.chat(

        model="llama3.1",

        messages=[

            {
             "role":"user",
             "content":prompt
            }

        ]

    )


    print(
        "\nBot:",
        response["message"]["content"]
    )