// import cluster from "cluster"
// import os from "os"




// const runPrimaryProcess = () => {
//   const cpus = os.cpus().length

//   if (cluster.isPrimary) {
//     for (let index = 0; index < cpus; index++)
//     {
//       cluster.fork()
//       console.log("Iniciando processo na porta: ",process.pid)
//     }
//   }

//   cluster.on("exit", (worker, code, signal) => {
//     if (code !== 0 && !worker.exitedAfterDisconnect) {
//       cluster.fork()
//       console.log(`Reiniciando worker pq o processo ${process.pid} parou`)
//     }
//   })
// }

// const runProccess = async () => {
//   await import("./ace.js")
// }

// if (cluster.isPrimary) {
//   runPrimaryProcess()
// } else {
//   runProccess()
// }

import cluster from "cluster";
import os from "os";
import path from "path";
import { fileURLToPath } from "url";

// Resolve __dirname para ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Número de CPUs disponíveis
const cpus = os.cpus().length;

// Função para rodar o processo principal
const runPrimaryProcess = () => {
  console.log(`Número de CPUs disponíveis: ${cpus}`);
  console.log(`Processo principal iniciado com PID: ${process.pid}`);

  // Cria um worker para cada CPU
  for (let i = 0; i < cpus; i++) {
    cluster.fork();
    console.log(`Worker ${i + 1} criado.`);
  }

  // Reinicia workers se falharem
  cluster.on("exit", (worker, code, signal) => {
    if (code !== 0 && !worker.exitedAfterDisconnect) {
      console.error(`Worker ${worker.process.pid} falhou. Criando novo...`);
      cluster.fork();
    }
  });
};

// Função para rodar o processo worker (Adonis com servidor HTTP)
const runWorkerProcess = async () => {
  try {
    console.log(`Worker iniciado com PID: ${process.pid}`);
    const { Ignitor } = await import('@adonisjs/core/build/standalone');

    // Inicializando o servidor AdonisJS
    const ignitor = new Ignitor(__dirname);
    await ignitor.httpServer().start(); // Isso iniciará o servidor HTTP
    console.log(`Servidor iniciado no Worker com PID: ${process.pid}`);
  } catch (err) {
    console.error("Erro ao iniciar o servidor:", err);
    process.exit(1); // Finaliza o processo com erro
  }
};

// Verifica se o processo é primário ou worker
if (cluster.isPrimary) {
  runPrimaryProcess();
} else {
  runWorkerProcess();
}
