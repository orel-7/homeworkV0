"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function OnlineHomework() {
  const [language, setLanguage] = useState("html")
  const [code, setCode] = useState("")
  const [output, setOutput] = useState("")

  useEffect(() => {
    // Set initial code based on selected language
    setCode(
      language === "html"
        ? "<!DOCTYPE html>\n<html>\n<body>\n\n<h1>שלום עולם</h1>\n\n</body>\n</html>"
        : 'print("שלום עולם")',
    )
  }, [language])

  const runCode = () => {
    if (language === "html") {
      setOutput(code)
    } else if (language === "python") {
      // Here you would typically send the code to a server to execute
      // For demonstration, we'll simulate Python execution
      try {
        // This is a very basic simulation and doesn't actually run Python code
        const lines = code.split("\n")
        const output = lines
          .map((line) => {
            if (line.startsWith("print(")) {
              return line.slice(6, -1).replace(/"/g, "")
            }
            return ""
          })
          .filter(Boolean)
          .join("\n")
        setOutput(output)
      } catch (error) {
        setOutput("שגיאה בהרצת הקוד")
      }
    }
  }

  return (
    <div className="space-y-4">
      <Select value={language} onValueChange={setLanguage}>
        <SelectTrigger>
          <SelectValue placeholder="בחר שפה" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="html">HTML</SelectItem>
          <SelectItem value="python">Python</SelectItem>
        </SelectContent>
      </Select>
      <Textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        placeholder="הקלד את הקוד שלך כאן"
        rows={10}
        dir={language === "html" ? "ltr" : "auto"}
        className={language === "html" ? "text-left" : ""}
      />
      <Button onClick={runCode}>הרץ קוד</Button>
      {output && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">פלט:</h3>
          {language === "html" ? (
            <div className="border p-4 rounded">
              <iframe srcDoc={output} style={{ width: "100%", height: "200px", border: "none" }} />
            </div>
          ) : (
            <pre className="bg-gray-100 p-4 rounded" dir="auto">
              {output}
            </pre>
          )}
        </div>
      )}
    </div>
  )
}

