

$VERBOSE = nil
require "strscan"
require "yaml"
require "test/unit"

module Intl
  def self.parse(string)
    scanner = StringScanner.new(string)
    template = []
    until scanner.eos? # untill we reach the end of the string
      # scan over the string until we find a { or } and store up to that point
      # in `literal`
      literal = scanner.scan(/[^{}]+/)
      if literal
        template << [:literal, literal]
        next
      end
      # true if there is a { at the current position in the string
      found_open = scanner.skip(/\{/)
      # store everything upto the next } in `variable`
      variable = scanner.scan(/[^}]+/) # anything except }, 1 or more times
      # true if there is a } at the current position in the string
      found_close = scanner.skip(/\}/)
      if found_open && variable && found_close
        template << [:variable, variable.to_sym]
      else
        raise "unexpected input #{scanner.inspect}"
      end
    end
    template
  end

  def self.format(template, variables)
    buf = +""
    template.each do |operation, value|
      case operation
      when :literal
        buf << value
      when :variable
        buf << variables.fetch(value)
      end
    end
    buf
  end

  def self.t(id, variables={})
    template = $translations[$locale][id]
    puts "*" * 40
    # puts id
    # puts variables

    # eng-gb
    puts template
    puts $locale

    puts "*" * 40
    
    # Logic
    if !$translations[$locale].keys.include?(id)
      # fallback: "en-gb" -> "en"
      newLocale = $locale.split('-')[0]

      template = $translations[newLocale][id]
    end
    

    raise "couldn't find translation for #{$locale}:#{id}" unless template
    format(template, variables)
  end

  def self.load(config)
    hash = YAML.load(config)
    hash.each do |cc, data|
      data.each do |id, string|
        data[id] = parse(string)
      end
    end
    puts hash
    hash
  end
end

class TestIntl
  def setup
    config = <<~YAML
    ---
    en:
      greeting: Hello, {subject}
    cy:
      greeting: Su’mae, {subject}
    fr:
      greeting: Bonjour {subject}
    es:
      greeting: Hola {subject}
    YAML
    $translations = Intl.load(config)
  end
  
  def test_welsh
    $locale = "cy"
    assert { Intl.t("greeting", subject: "Mat") == "Su’mae, Mat"}
  end
  
  def test_french
    $locale = "fr"
    assert { Intl.t("greeting", subject: "Mat") == "Bonjour Mat"}
  end
end

class TestFallback

  def initialize
    setup
  end

  def setup
    config = <<~YAML
      ---
      en:
        greeting: Hello, {subject}
        company_info: Highspot is a sales enablement company, the brand color is blue.
      en-gb:
        company_info: Highspot are a sales enablement company, the brand colour is blue.
    YAML
    $translations = Intl.load(config)
  end

  def test_english
    $locale = "en"
    raise unless Intl.t("greeting", subject: "Mat") == "Hello, Mat"
    raise unless Intl.t("company_info") == "Highspot is a sales enablement company, the brand color is blue." 
  end

  def test_british
    $locale = "en-gb"
    raise unless Intl.t("greeting", subject: "Mat") == "Hello, Mat"
    raise unless Intl.t("company_info") == "Highspot are a sales enablement company, the brand colour is blue."
  end
end

test = TestFallback.new
# test.test_english
test.test_british